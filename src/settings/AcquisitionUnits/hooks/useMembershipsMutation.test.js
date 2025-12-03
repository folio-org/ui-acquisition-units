import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  createMembership,
  deleteMembership,
} from '../utils/api';
import { useMembershipsMutation } from './useMembershipsMutation';

jest.mock('../utils/api', () => ({
  createMembership: jest.fn(),
  deleteMembership: jest.fn(),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useMembershipsMutation', () => {
  beforeEach(() => {
    createMembership.mockImplementation(() => async (data) => ({ ...data, id: 'cm1' }));
    deleteMembership.mockImplementation(() => async (id) => ({ id }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('exposes create/delete that call api', async () => {
    const { result } = renderHook(() => useMembershipsMutation(), { wrapper });

    let created;
    await waitFor(async () => {
      created = await result.current.createMembership({ data: { userId: '1', acquisitionsUnitId: '2' } });
      expect(createMembership).toHaveBeenCalled();
      expect(created.id).toBe('cm1');
    });

    let deleted;
    await waitFor(async () => {
      deleted = await result.current.deleteMembership({ id: 'cm1' });
      expect(deleteMembership).toHaveBeenCalled();
      expect(deleted.id).toBe('cm1');
    });
  });
});
