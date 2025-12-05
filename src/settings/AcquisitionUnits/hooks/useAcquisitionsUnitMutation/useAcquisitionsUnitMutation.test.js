import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  createAcquisitionsUnit,
  deleteAcquisitionsUnit,
  updateAcquisitionsUnit,
} from '../../utils/api';
import { useAcquisitionsUnitMutation } from './useAcquisitionsUnitMutation';

jest.mock('../../utils/api', () => ({
  createAcquisitionsUnit: jest.fn(),
  deleteAcquisitionsUnit: jest.fn(),
  updateAcquisitionsUnit: jest.fn(),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useAcquisitionsUnitMutation', () => {
  beforeEach(() => {
    createAcquisitionsUnit.mockImplementation(() => async (data) => ({ ...data, id: 'new' }));
    updateAcquisitionsUnit.mockImplementation(() => async (data) => ({ ...data }));
    deleteAcquisitionsUnit.mockImplementation(() => async (id) => ({ id }));
  });

  afterEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  it('exposes create/update/delete that call api', async () => {
    const { result } = renderHook(() => useAcquisitionsUnitMutation(), { wrapper });

    // call create
    let created;

    await waitFor(async () => {
      created = await result.current.createAcquisitionsUnit({ data: { name: 'x' } });
      expect(createAcquisitionsUnit).toHaveBeenCalled();
      expect(created.id).toBe('new');
    });

    // call update
    let updated;

    await waitFor(async () => {
      updated = await result.current.updateAcquisitionsUnit({ data: { id: 'u1', name: 'y' } });
      expect(updateAcquisitionsUnit).toHaveBeenCalled();
      expect(updated.name).toBe('y');
    });

    // call delete
    let deleted;

    await waitFor(async () => {
      deleted = await result.current.deleteAcquisitionsUnit({ id: 'u1' });
      expect(deleteAcquisitionsUnit).toHaveBeenCalled();
      expect(deleted.id).toBe('u1');
    });
  });
});
