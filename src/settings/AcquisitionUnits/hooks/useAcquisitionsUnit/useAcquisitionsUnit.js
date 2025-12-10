import { useQuery } from 'react-query';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

import { fetchAcquisitionsUnitById } from '../../utils/api';

export const useAcquisitionsUnit = (id, options = {}) => {
  const {
    enabled = true,
    tenantId,
    ...queryOptions
  } = options;

  const ky = useOkapiKy({ tenant: tenantId });
  const [namespace] = useNamespace({ key: 'acquisitions-unit-by-id' });

  const { data, ...rest } = useQuery({
    queryKey: [namespace, tenantId, id],
    queryFn: ({ signal }) => fetchAcquisitionsUnitById(ky)(id, { signal }),
    enabled: enabled && Boolean(id),
    ...queryOptions,
  });

  return {
    acquisitionsUnit: data,
    ...rest,
  };
};
