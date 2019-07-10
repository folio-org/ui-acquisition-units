import React, { useState, useRef, useEffect } from 'react';
import withRouter from 'react-router-dom/withRouter';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { get, isEqual } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';

import { LIMIT_MAX } from '../constants';
import {
  ACQUISITIONS_UNIT_MEMBERSHIPS,
  USERS,
  PATRON_GROUPS,
} from '../resources';
import AcquisitionUnitMemberships from './AcquisitionUnitMemberships';

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
      mutator.users.GET({
        params: {
          limit: LIMIT_MAX,
          query: memberships.map(({ userId }) => `id==${userId}`).join(' or '),
        },
      }).then(usersResponse => setUsers(usersResponse));
    }

    // build patronGroups map
    if (!isEqual(prevPatronGroups, patronGroups)) {
      setPatronGroupsMap(patronGroups.reduce((acc, { id, desc }) => {
        acc[id] = desc;

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