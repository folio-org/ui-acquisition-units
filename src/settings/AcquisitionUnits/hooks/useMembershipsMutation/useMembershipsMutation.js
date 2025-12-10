import { useMutation } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import * as api from '../../utils/api';

export const useMembershipsMutation = (options = {}) => {
  const { tenantId } = options;

  const ky = useOkapiKy({ tenant: tenantId });

  const {
    isLoading: isMembershipCreating,
    mutateAsync: createMembership,
  } = useMutation({
    mutationFn: ({ data }) => api.createMembership(ky)(data),
  });

  const {
    isLoading: isMembershipDeleting,
    mutateAsync: deleteMembership,
  } = useMutation({
    mutationFn: ({ id }) => api.deleteMembership(ky)(id),
  });

  const isLoading = isMembershipCreating || isMembershipDeleting;

  return {
    createMembership,
    deleteMembership,
    isLoading,
  };
};
