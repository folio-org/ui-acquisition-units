import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';

import { fetchMemberships } from '../utils/api';
import { useMemberships } from './useMemberships';

jest.mock('../utils/api', () => ({
  fetchMemberships: jest.fn(),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useMemberships', () => {
  beforeEach(() => {
    fetchMemberships.mockImplementation(() => async () => ({ acquisitionsUnitMemberships: [{ id: 'm1' }], totalRecords: 1 }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns memberships and total', async () => {
    const { result } = renderHook(() => useMemberships({ searchParams: {} }), { wrapper });

    await waitFor(() => {
      expect(result.current.memberships).toHaveLength(1);
      expect(result.current.totalRecords).toBe(1);
    });
  });
});
