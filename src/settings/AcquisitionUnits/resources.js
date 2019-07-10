import {
  ACQUISITIONS_UNITS_API,
  ACQUISITIONS_UNIT_MEMBERSHIPS_API,
  USERS_API,
  USER_GROUPS_API,
  LIMIT_MAX,
} from './constants';

const BASE_RESOURCE = {
  perRequest: LIMIT_MAX,
  throwErrors: false,
  type: 'okapi',
};

export const ACQUISITIONS_UNITS = {
  ...BASE_RESOURCE,
  path: ACQUISITIONS_UNITS_API,
  records: 'acquisitionsUnits',
};

export const ACQUISITIONS_UNIT = {
  ...BASE_RESOURCE,
  path: `${ACQUISITIONS_UNITS_API}/:{id}`,
};

export const ACQUISITIONS_UNIT_MEMBERSHIPS = {
  ...BASE_RESOURCE,
  path: ACQUISITIONS_UNIT_MEMBERSHIPS_API,
  records: 'acquisitionsUnitMemberships',
  GET: {
    params: {
      query: '(acquisitionsUnitId==:{id})',
    },
  },
};

export const USERS = {
  ...BASE_RESOURCE,
  path: USERS_API,
  records: 'users',
  accumulate: true,
};

export const PATRON_GROUPS = {
  ...BASE_RESOURCE,
  path: USER_GROUPS_API,
  records: 'usergroups',
};
