import flatten from 'lodash/flatten';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Loading } from '@folio/stripes/components';
import { getFullName } from '@folio/stripes/util';
import { useUsersBatch } from '@folio/stripes-acq-components';

import {
  useAcquisitionsUnitMemberships,
  useMembershipsMutation,
  useUserGroups,
} from '../hooks';

import AcquisitionUnitMemberships from './AcquisitionUnitMemberships';

const AcquisitionUnitMembershipsContainer = () => {
  const { id: acquisitionsUnitId } = useParams();

  const {
    isFetched: isMembershipsFetched,
    isFetching: isMembershipsFetching,
    isLoading: isMembershipsLoading,
    memberships,
    refetch: refetchMemberships,
  } = useAcquisitionsUnitMemberships(acquisitionsUnitId);

  const {
    createMembership,
    deleteMembership,
    isLoading: isMembershipsMutating,
  } = useMembershipsMutation();

  const {
    isFetching: isUserGroupsFetching,
    isLoading: isUserGroupsLoading,
    userGroups,
  } = useUserGroups();

  const mappedUserGroupsDict = useMemo(() => {
    return userGroups.reduce((acc, { id, desc }) => {
      acc[id] = desc;

      return acc;
    }, {});
  }, [userGroups]);

  const userIds = useMemo(() => memberships.map(({ userId }) => userId), [memberships]);

  const {
    isFetching: isUsersFetching,
    isLoading: isUsersLoading,
    users,
  } = useUsersBatch(userIds, {
    enabled: isMembershipsFetched,
    keepPreviousData: memberships.length > 0,
  });

  const mappedUsers = useMemo(() => {
    return sortBy(
      map(
        flatten(users),
        u => ({ fullName: getFullName(u) ?? '', ...u }),
      ),
      [u => u.fullName.toLowerCase()],
    );
  }, [users]);

  const addMemberships = async (selectedUsers) => {
    const promises = selectedUsers.map(user => {
      return createMembership({
        data: {
          acquisitionsUnitId,
          userId: user.id,
        },
      });
    });

    await Promise.all(promises);
    refetchMemberships();
  };

  const removeMembership = async (user) => {
    const membership = memberships.find(({ userId }) => userId === user.id);

    if (membership) {
      await deleteMembership({ id: membership.id });
      refetchMemberships();
    }
  };

  const isLoading = (
    isMembershipsLoading
    || isUsersLoading
    || isUserGroupsLoading
  );

  const isFetching = (
    isMembershipsFetching
    || isUsersFetching
    || isUserGroupsFetching
    || isMembershipsMutating
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AcquisitionUnitMemberships
      addMemberships={addMemberships}
      isLoading={isFetching}
      patronGroups={mappedUserGroupsDict}
      removeMembership={removeMembership}
      users={mappedUsers}
    />
  );
};

export default AcquisitionUnitMembershipsContainer;
