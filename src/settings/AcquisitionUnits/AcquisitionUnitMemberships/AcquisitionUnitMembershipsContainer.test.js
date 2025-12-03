import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { MemoryRouter } from 'react-router-dom';

import {
  render,
  screen,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';
import { Pluggable } from '@folio/stripes/core';
import { useUsersBatch } from '@folio/stripes-acq-components';

import * as api from '../utils/api';
import AcquisitionUnitMembershipsContainer from './AcquisitionUnitMembershipsContainer';

jest.mock('@folio/stripes-acq-components', () => ({
  ...jest.requireActual('@folio/stripes-acq-components'),
  useUsersBatch: jest.fn(),
}));

jest.mock('../utils/api');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({ id: '1' })),
}));

const user = { id: '1', personal: { lastName: 'Doe', firstName: 'John' } };

const selectUsersLabel = 'Select users';

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter>
      {children}
    </MemoryRouter>
  </QueryClientProvider>
);

const renderAcquisitionUnitMembershipsContainer = (props = {}) => render(
  <AcquisitionUnitMembershipsContainer {...props} />,
  { wrapper },
);

describe('AcquisitionUnitMembershipsContainer', () => {
  beforeEach(() => {
    api.fetchAcquisitionsUnitById.mockReturnValue(jest.fn().mockResolvedValue({ id: '1' }));
    api.fetchUserGroups.mockReturnValue(jest.fn().mockResolvedValue({
      usergroups: [],
      totalRecords: 0,
    }));
    api.fetchMemberships.mockReturnValue(jest.fn().mockResolvedValue({
      acquisitionsUnitMemberships: [{ userId: user.id, id: 'mem1' }],
      totalRecords: 1,
    }));
    
    api.createMembership.mockReturnValue(jest.fn().mockResolvedValue({ id: 'new-mem' }));
    api.deleteMembership.mockReturnValue(jest.fn().mockResolvedValue({}));

    useUsersBatch.mockReturnValue({
      isFetching: false,
      isLoading: false,
      users: [user],
    });

    Pluggable.mockImplementation(({ selectUsers }) => (
      <button
        type="button"
        onClick={() => {
          selectUsers([{ id: '1' }]);
        }}
      >
        {selectUsersLabel}
      </button>
    ));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render users plugin trigger', async () => {
    renderAcquisitionUnitMembershipsContainer();

    await waitFor(() => {
      expect(screen.getByText(selectUsersLabel)).toBeInTheDocument();
    });
  });

  it('should handle user assignment', async () => {
    renderAcquisitionUnitMembershipsContainer();

    await waitFor(() => {
      expect(screen.getByText(selectUsersLabel)).toBeInTheDocument();
    });

    await userEvent.click(screen.getByText(selectUsersLabel));
    
    // API function should be called through hooks
    expect(api.createMembership).toHaveBeenCalled();

    await userEvent.click(screen.getByRole('button', { name: 'ui-acquisition-units.unit.membership.actions.remove' }));

    expect(api.deleteMembership).toHaveBeenCalled();
  });
});
