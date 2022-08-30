import { act, render } from '@testing-library/react';
import user from '@testing-library/user-event';

import '@folio/stripes-acq-components/test/jest/__mock__';

import AcquisitionUnitMemberships from './AcquisitionUnitMemberships';

jest.mock('./AssignAcquisitionUnitMemberships', () => {
  return jest.fn(() => 'AssignAcquisitionUnitMemberships');
});

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
    const fullName = 'Admin, Diku';

    const member = {
      fullName,
    };
    const { getByText } = renderAcquisitionUnitMemberships({
      users: [member],
    });

    expect(getByText(fullName)).toBeDefined();
  });

  it('should call removeMembership when member remove action is pressed', async () => {
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

    await act(async () => user.click(getAllByTestId('membership-action-remove')[0]));

    expect(removeMembership).toHaveBeenCalledWith({
      ...member,
      rowIndex: 0,
    });
  });
});
