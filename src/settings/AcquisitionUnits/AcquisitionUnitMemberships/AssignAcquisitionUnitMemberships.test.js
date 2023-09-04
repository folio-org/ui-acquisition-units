import { render } from '@folio/jest-config-stripes/testing-library/react';

import AssignAcquisitionUnitMemberships from './AssignAcquisitionUnitMemberships';

const renderAssignAcquisitionUnitMemberships = ({
  addMemberships = jest.fn(),
} = {}) => (render(
  <AssignAcquisitionUnitMemberships addMemberships={addMemberships} />,
));

describe('AssignAcquisitionUnitMemberships', () => {
  it('should render plugin', () => {
    const { getByText } = renderAssignAcquisitionUnitMemberships();

    expect(getByText('ui-acquisition-units.unit.membership.actions.assign.notAvailable')).toBeDefined();
  });
});
