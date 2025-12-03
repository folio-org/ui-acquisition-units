import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';
import { ALL_RECORDS_CQL } from '@folio/stripes-acq-components';

import { LIMIT_MAX } from '../../constants';
import { fetchMemberships } from '../../utils/api';

const DEFAULT_DATA = [];

const DEFAULT_SEARCH_PARAMS = {
  limit: LIMIT_MAX,
  query: ALL_RECORDS_CQL,
};

export const useMemberships = (options = {}) => {
  const {
    enabled = true,
    tenantId,
    searchParams: searchParamsOption = {},
    ...queryOptions
  } = options;

  const ky = useOkapiKy({ tenant: tenantId });
  const [namespace] = useNamespace({ key: 'acquisitions-units-memberships' });

  const { data, ...rest } = useQuery({
    queryKey: [namespace, tenantId, searchParamsOption],
    queryFn: ({ signal }) => {
      const searchParams = {
        ...DEFAULT_SEARCH_PARAMS,
        ...searchParamsOption,
      };

      return fetchMemberships(ky)({ searchParams, signal });
    },
    enabled,
    ...queryOptions,
  });

  return {
    memberships: data?.acquisitionsUnitMemberships || DEFAULT_DATA,
    totalRecords: data?.totalRecords,
    ...rest,
  };
};
