import {
  ACQUISITIONS_UNITS_API,
  ACQUISITIONS_UNIT_MEMBERSHIPS_API,
} from '@folio/stripes-acq-components';

import { USER_GROUPS_API } from '../constants';

/* GET */
export const fetchAcquisitionsUnitById = (httpClient) => async (acquisitionsUnitId, options) => {
  return httpClient.get(`${ACQUISITIONS_UNITS_API}/${acquisitionsUnitId}`, options).json();
};

export const fetchMemberships = (httpClient) => async (options) => {
  return httpClient.get(ACQUISITIONS_UNIT_MEMBERSHIPS_API, options).json();
};

export const fetchUserGroups = (httpClient) => async (options) => {
  return httpClient.get(USER_GROUPS_API, options).json();
};

/* POST */
export const createAcquisitionsUnit = (httpClient) => async (data, options) => {
  return httpClient.post(ACQUISITIONS_UNITS_API, { json: data, ...options }).json();
};

export const createMembership = (httpClient) => async (data, options) => {
  return httpClient.post(ACQUISITIONS_UNIT_MEMBERSHIPS_API, { json: data, ...options }).json();
};

/* PUT */
export const updateAcquisitionsUnit = (httpClient) => async (data, options) => {
  return httpClient.put(`${ACQUISITIONS_UNITS_API}/${data.id}`, { json: data, ...options }).json();
};

/* DELETE */
export const deleteAcquisitionsUnit = (httpClient) => async (id, options) => {
  return httpClient.delete(`${ACQUISITIONS_UNITS_API}/${id}`, options);
};

export const deleteMembership = (httpClient) => async (id, options) => {
  return httpClient.delete(`${ACQUISITIONS_UNIT_MEMBERSHIPS_API}/${id}`, options);
};
