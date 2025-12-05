import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { get, isEqual, flatten, sortBy, map } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';
import { getFullName } from '@folio/stripes/util';

import {
  ACQUISITIONS_UNIT_MEMBERSHIPS,
  USERS,
  PATRON_GROUPS,
} from '../resources';
import AcquisitionUnitMemberships from './AcquisitionUnitMemberships';

const USERS_LIMIT = 15;

const usePrevious = value => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

const AcquisitionUnitMembershipsContainer = ({ match, resources, mutator }) => {
  const memberships = get(resources, 'acquisitionsUnitMemberships.records', []);
  const patronGroups = get(resources, 'patronGroups.records', []);

  const prevMemberships = usePrevious(memberships);
  const prevPatronGroups = usePrevious(patronGroups);

  const [users, setUsers] = useState([]);
  const [patronGroupsMap, setPatronGroupsMap] = useState({});

  useEffect(() => {
    // reset users when all memberships were removed
    if (!isEqual(prevMemberships, memberships) && !memberships.length) {
      setUsers([]);
    }

    // set users based on new memberships
    if (!isEqual(prevMemberships, memberships) && memberships.length) {
      // BE doesn't support long query string so split by several small requests
      const userIds = memberships.map(({ userId }) => userId);
      const usersPromises = [];

      while (userIds.length) {
        usersPromises.push(mutator.users.GET({
          params: {
            limit: USERS_LIMIT,
            query: userIds.splice(0, USERS_LIMIT)
              .map(userId => `id==${userId}`)
              .join(' or '),
          },
        }));
      }

      Promise.all(usersPromises)
        .then(userArrays => {
          const hydratedUsers = sortBy(
            map(
              flatten(userArrays),
              u => ({ fullName: getFullName(u) ?? '', ...u }),
            ),
            [u => u.fullName.toLowerCase()],
          );

          setUsers(hydratedUsers);
        });
    }

    // build patronGroups map
    if (!isEqual(prevPatronGroups, patronGroups)) {
      setPatronGroupsMap(patronGroups.reduce((acc, { id, group }) => {
        acc[id] = group;

        return acc;
      }, {}));
    }
  }, [prevMemberships, memberships, patronGroupsMap, patronGroups, prevPatronGroups, mutator.users]);

  const addMemberships = selectedUsers => {
    const acquisitionsUnitId = get(match, ['params', 'id']);

    selectedUsers.forEach(user => {
      mutator.acquisitionsUnitMemberships.POST({
        userId: user.id,
        acquisitionsUnitId,
      });
    });
  };

  const removeMembership = user => {
    const membership = memberships.find(({ userId }) => userId === user.id);

    if (membership) {
      mutator.acquisitionsUnitMemberships.DELETE({ id: membership.id });
    }
  };

  return (
    <AcquisitionUnitMemberships
      users={users}
      addMemberships={addMemberships}
      removeMembership={removeMembership}
      patronGroups={patronGroupsMap}
    />
  );
};

AcquisitionUnitMembershipsContainer.manifest = {
  acquisitionsUnitMemberships: ACQUISITIONS_UNIT_MEMBERSHIPS,
  users: USERS,
  patronGroups: PATRON_GROUPS,
};

AcquisitionUnitMembershipsContainer.propTypes = {
  resources: PropTypes.object.isRequired,
  mutator: PropTypes.object.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

export default withRouter(stripesConnect(AcquisitionUnitMembershipsContainer));
