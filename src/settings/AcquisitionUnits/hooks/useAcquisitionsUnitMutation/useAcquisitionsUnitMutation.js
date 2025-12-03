import { useMutation } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import * as api from '../../utils/api';

export const useAcquisitionsUnitMutation = (options = {}) => {
  const { tenantId } = options;

  const ky = useOkapiKy({ tenant: tenantId });

  const {
    isLoading: isAcquisitionsUnitCreating,
    mutateAsync: createAcquisitionsUnit,
  } = useMutation({
    mutationFn: ({ data }) => api.createAcquisitionsUnit(ky)(data),
  });

  const {
    isLoading: isAcquisitionsUnitUpdating,
    mutateAsync: updateAcquisitionsUnit,
  } = useMutation({
    mutationFn: ({ data }) => api.updateAcquisitionsUnit(ky)(data),
  });

  const {
    isLoading: isAcquisitionsUnitDeleting,
    mutateAsync: deleteAcquisitionsUnit,
  } = useMutation({
    mutationFn: ({ id }) => api.deleteAcquisitionsUnit(ky)(id),
  });

  const isLoading = isAcquisitionsUnitCreating || isAcquisitionsUnitUpdating || isAcquisitionsUnitDeleting;

  return {
    createAcquisitionsUnit,
    deleteAcquisitionsUnit,
    isLoading,
    updateAcquisitionsUnit,
  };
};
