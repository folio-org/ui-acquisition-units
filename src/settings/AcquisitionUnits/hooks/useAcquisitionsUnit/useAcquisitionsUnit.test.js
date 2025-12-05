import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';

import { fetchAcquisitionsUnitById } from '../../utils/api';
import { useAcquisitionsUnit } from './useAcquisitionsUnit';

jest.mock('../../utils/api', () => ({
  fetchAcquisitionsUnitById: jest.fn(),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('useAcquisitionsUnit', () => {
  beforeEach(() => {
    fetchAcquisitionsUnitById.mockImplementation(() => async (id) => ({ id }));
  });

  afterEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  it('should fetch unit by id', async () => {
    const id = 5;
    const { result } = renderHook(() => useAcquisitionsUnit(id), { wrapper });

    await waitFor(() => expect(result.current.acquisitionsUnit).toEqual({ id }));
  });
});
