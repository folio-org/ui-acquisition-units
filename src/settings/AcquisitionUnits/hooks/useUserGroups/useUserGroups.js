import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';
import {
  ALL_RECORDS_CQL,
  LIMIT_MAX,
} from '@folio/stripes-acq-components';

import { fetchUserGroups } from '../../utils/api';

const DEFAULT_DATA = [];

export const useUserGroups = (options = {}) => {
  const {
    enabled = true,
    tenantId,
    ...queryOptions
  } = options;

  const ky = useOkapiKy({ tenant: tenantId });
  const [namespace] = useNamespace({ key: 'user-groups' });

  const { data, ...rest } = useQuery({
    queryKey: [namespace, tenantId],
    queryFn: ({ signal }) => {
      const searchParams = {
        limit: LIMIT_MAX,
        query: ALL_RECORDS_CQL,
      };

      return fetchUserGroups(ky)({ searchParams, signal });
    },
    enabled,
    ...queryOptions,
  });

  return {
    userGroups: data?.usergroups || DEFAULT_DATA,
    totalRecords: data?.totalRecords,
    ...rest,
  };
};
