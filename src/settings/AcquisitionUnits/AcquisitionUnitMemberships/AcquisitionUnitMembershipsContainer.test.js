import { MemoryRouter } from 'react-router-dom';

import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';
import { Pluggable } from '@folio/stripes/core';

import AcquisitionUnitMembershipsContainer from './AcquisitionUnitMembershipsContainer';

const user = { id: '1', personal: { lastName: 'Doe', firstName: 'John' } };

const defaultProps = {
  mutator: {
    acquisitionsUnitMemberships: {
      POST: jest.fn(() => Promise.resolve()),
      DELETE: jest.fn(() => Promise.resolve()),
    },
    users: {
      GET: jest.fn(() => Promise.resolve([user])),
    },
  },
  resources: {
    acquisitionsUnitMemberships: {
      records: [{ userId: '1' }],
    },
    patronGroups: {
      records: [{ id: '1', desc: 'qwerty' }],
    },
  },
};

const selectUsersLabel = 'Select users';

const renderAcquisitionUnitMembershipsContainer = (props = {}) => (render(
  <MemoryRouter>
    <AcquisitionUnitMembershipsContainer
      {...defaultProps}
      {...props}
    />
  </MemoryRouter>,
));

describe('AcquisitionUnitMembershipsContainer', () => {
  beforeEach(() => {
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

  it('should render users plugin trigger', () => {
    renderAcquisitionUnitMembershipsContainer();

    expect(screen.getByText(selectUsersLabel)).toBeInTheDocument();
  });

  it('should handle user assignment', async () => {
    renderAcquisitionUnitMembershipsContainer();

    await userEvent.click(screen.getByText(selectUsersLabel));

    expect(defaultProps.mutator.acquisitionsUnitMemberships.POST).toHaveBeenCalledWith(
      expect.objectContaining({ userId: '1' }),
    );

    await userEvent.click(screen.getByRole('button', { name: 'ui-acquisition-units.unit.membership.actions.remove' }));

    expect(defaultProps.mutator.acquisitionsUnitMemberships.DELETE).toHaveBeenCalled();
  });
});
