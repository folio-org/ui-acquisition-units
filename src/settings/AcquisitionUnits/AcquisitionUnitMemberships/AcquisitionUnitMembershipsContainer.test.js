import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import '@folio/stripes-acq-components/test/jest/__mock__';

import AcquisitionUnitMembershipsContainer from './AcquisitionUnitMembershipsContainer';

jest.mock('./AcquisitionUnitMemberships', () => {
  return () => <span>AcquisitionUnitMemberships</span>;
});

const renderAcquisitionUnitMembershipsContainer = ({
  resources = {},
  mutator = {},
} = {}) => (render(
  <MemoryRouter>
    <AcquisitionUnitMembershipsContainer
      resources={resources}
      mutator={mutator}
    />
  </MemoryRouter>,
));

describe('AcquisitionUnitMembershipsContainer', () => {
  it('should render AcquisitionUnitMemberships', () => {
    const { getByText } = renderAcquisitionUnitMembershipsContainer();

    expect(getByText('AcquisitionUnitMemberships')).toBeDefined();
  });
});
