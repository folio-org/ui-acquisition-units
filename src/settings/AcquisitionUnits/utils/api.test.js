import {
  ACQUISITIONS_UNIT_MEMBERSHIPS_API,
  ACQUISITIONS_UNITS_API,
} from '@folio/stripes-acq-components';

import { USER_GROUPS_API } from '../constants';
import {
  createAcquisitionsUnit,
  createMembership,
  deleteAcquisitionsUnit,
  deleteMembership,
  fetchAcquisitionsUnitById,
  fetchMemberships,
  fetchUserGroups,
  updateAcquisitionsUnit,
} from './api';

const httpClient = {
  extend: jest.fn().mockReturnThis(),
  get: jest.fn(() => ({
    json: jest.fn(() => Promise.resolve({})),
  })),
  post: jest.fn(() => ({
    json: jest.fn(() => Promise.resolve({})),
  })),
  put: jest.fn(() => ({
    json: jest.fn(() => Promise.resolve({})),
  })),
  delete: jest.fn(() => Promise.resolve({})),
};

const options = {};

describe('API utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createAcquisitionsUnit', () => {
    it('should create acquisitions unit', async () => {
      const data = { name: 'New Unit' };

      await createAcquisitionsUnit(httpClient)(data, options);

      expect(httpClient.post).toHaveBeenCalledWith(ACQUISITIONS_UNITS_API, { json: data, ...options });
    });
  });

  describe('createMembership', () => {
    it('should create acquisitions unit membership', async () => {
      const data = { userId: 'user-id-123', acquisitionsUnitId: 'unit-id-456' };

      await createMembership(httpClient)(data, options);

      expect(httpClient.post).toHaveBeenCalledWith(ACQUISITIONS_UNIT_MEMBERSHIPS_API, { json: data, ...options });
    });
  });

  describe('deleteAcquisitionsUnit', () => {
    it('should delete acquisitions unit by ID', async () => {
      const acquisitionsUnitId = 'unit-id-123';

      await deleteAcquisitionsUnit(httpClient)(acquisitionsUnitId, options);

      expect(httpClient.delete).toHaveBeenCalledWith(`${ACQUISITIONS_UNITS_API}/${acquisitionsUnitId}`, options);
    });
  });

  describe('deleteMembership', () => {
    it('should delete acquisitions unit membership by ID', async () => {
      const membershipId = 'membership-id-123';

      await deleteMembership(httpClient)(membershipId, options);

      expect(httpClient.delete).toHaveBeenCalledWith(`${ACQUISITIONS_UNIT_MEMBERSHIPS_API}/${membershipId}`, options);
    });
  });

  describe('fetchAcquisitionsUnitById', () => {
    it('should fetch acquisitions unit by ID', async () => {
      const acquisitionsUnitId = 'unit-id-123';

      await fetchAcquisitionsUnitById(httpClient)(acquisitionsUnitId, options);

      expect(httpClient.get).toHaveBeenCalledWith(`${ACQUISITIONS_UNITS_API}/${acquisitionsUnitId}`, options);
    });
  });

  describe('fetchMemberships', () => {
    it('should fetch acquisitions unit memberships', async () => {
      await fetchMemberships(httpClient)(options);

      expect(httpClient.get).toHaveBeenCalledWith(ACQUISITIONS_UNIT_MEMBERSHIPS_API, options);
    });
  });

  describe('fetchUserGroups', () => {
    it('should fetch user groups', async () => {
      await fetchUserGroups(httpClient)(options);

      expect(httpClient.get).toHaveBeenCalledWith(USER_GROUPS_API, options);
    });
  });

  describe('updateAcquisitionsUnit', () => {
    it('should update acquisitions unit', async () => {
      const data = { id: 'unit-id-123', name: 'Updated Unit' };

      await updateAcquisitionsUnit(httpClient)(data, options);

      expect(httpClient.put).toHaveBeenCalledWith(`${ACQUISITIONS_UNITS_API}/${data.id}`, { json: data, ...options });
    });
  });
});
