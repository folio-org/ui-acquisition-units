import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';

import { getFullName } from '@folio/stripes/util';
import '@folio/stripes-acq-components/test/jest/__mock__';

import AcquisitionUnitMemberships from './AcquisitionUnitMemberships';

jest.mock('./AssignAcquisitionUnitMemberships', () => {
  return jest.fn(() => 'AssignAcquisitionUnitMemberships');
});
jest.mock('@folio/stripes/util', () => ({
  getFullName: jest.fn(),
}));

const renderAcquisitionUnitMemberships = ({
  users = [],
  addMemberships = jest.fn(),
  removeMembership = jest.fn(),
  patronGroups = {},
} = {}) => (render(
  <AcquisitionUnitMemberships
    users={users}
    addMemberships={addMemberships}
    removeMembership={removeMembership}
    patronGroups={patronGroups}
  />,
));

describe('AcquisitionUnitMemberships', () => {
  it('should display assign member to unit button', () => {
    const { getByText } = renderAcquisitionUnitMemberships();

    expect(getByText('AssignAcquisitionUnitMemberships')).toBeDefined();
  });

  it('should format patron group value in table', () => {
    const patronGroup = 'Graduated';
    const { getByText } = renderAcquisitionUnitMemberships({
      patronGroups: {
        1: patronGroup,
      },
      users: [{
        patronGroup: 1,
      }],
    });

    expect(getByText(patronGroup)).toBeDefined();
  });

  it('should format name value in table', () => {
    const name = 'Admin, Diku';

    getFullName.mockClear().mockReturnValue(name);

    const member = {
      personal: {
        lastName: 'Diku',
        firstName: 'Admin',
      },
    };
    const { getByText } = renderAcquisitionUnitMemberships({
      users: [member],
    });

    expect(getByText(name)).toBeDefined();
  });

  it('should call removeMembership when member remove action is pressed', () => {
    const member = {
      personal: {
        lastName: 'Diku',
      },
    };
    const removeMembership = jest.fn();
    const { getAllByTestId } = renderAcquisitionUnitMemberships({
      users: [member],
      removeMembership,
    });

    user.click(getAllByTestId('membership-action-remove')[0]);

    expect(removeMembership).toHaveBeenCalledWith({
      ...member,
      rowIndex: 0,
    });
  });
});
