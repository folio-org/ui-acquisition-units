import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';

import { fetchMemberships } from '../utils/api';
import { useAcquisitionsUnitMemberships } from './useAcquisitionsUnitMemberships';

jest.mock('../utils/api', () => ({
  fetchMemberships: jest.fn(),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useAcquisitionsUnitMemberships', () => {
  beforeEach(() => {
    fetchMemberships.mockImplementation(() => async () => ({ acquisitionsUnitMemberships: [{ id: 'm1' }], totalRecords: 1 }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls memberships with acquisitionsUnitId', async () => {
    const { result } = renderHook(() => useAcquisitionsUnitMemberships(10), { wrapper });

    await waitFor(() => expect(result.current.memberships).toHaveLength(1));
  });
});
