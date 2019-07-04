import {
  ACQUISITIONS_UNITS_API,
  LIMIT_MAX,
} from './constants';

// eslint-disable-next-line import/prefer-default-export
export const ACQUISITIONS_UNITS = {
  perRequest: LIMIT_MAX,
  throwErrors: false,
  type: 'okapi',
  path: ACQUISITIONS_UNITS_API,
  records: 'acquisitionsUnits',
};

export const ACQUISITIONS_UNIT = {
  throwErrors: false,
  type: 'okapi',
  path: `${ACQUISITIONS_UNITS_API}/:{id}`,
};
