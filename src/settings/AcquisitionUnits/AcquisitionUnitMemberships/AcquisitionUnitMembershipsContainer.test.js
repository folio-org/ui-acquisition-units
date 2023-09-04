import { MemoryRouter } from 'react-router-dom';

import { render } from '@folio/jest-config-stripes/testing-library/react';

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
