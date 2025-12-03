import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';

import { fetchUserGroups } from '../utils/api';
import { useUserGroups } from './useUserGroups';

jest.mock('../utils/api', () => ({
  fetchUserGroups: jest.fn(),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useUserGroups', () => {
  beforeEach(() => {
    fetchUserGroups.mockImplementation(() => async () => ({ usergroups: [{ id: 'g1' }], totalRecords: 1 }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns groups', async () => {
    const { result } = renderHook(() => useUserGroups(), { wrapper });

    await waitFor(() => expect(result.current.userGroups).toHaveLength(1));
  });
});
