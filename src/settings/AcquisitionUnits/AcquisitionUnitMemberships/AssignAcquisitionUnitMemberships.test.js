import React from 'react';
import { render } from '@testing-library/react';

import '@folio/stripes-acq-components/test/jest/__mock__';

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
