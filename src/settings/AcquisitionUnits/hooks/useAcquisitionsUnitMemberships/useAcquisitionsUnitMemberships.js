import { useMemberships } from '../useMemberships';

export const useAcquisitionsUnitMemberships = (acqUnitId, options = {}) => {
  const { enabled = true, ...restOptions } = options;

  const searchParams = {
    query: `acquisitionsUnitId==${acqUnitId}`,
  };

  return useMemberships({
    enabled: Boolean(acqUnitId) && enabled,
    searchParams,
    ...restOptions,
  });
};
