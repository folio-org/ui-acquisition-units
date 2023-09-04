import { render } from '@folio/jest-config-stripes/testing-library/react';

import AcquisitionUnitsListContainer from './AcquisitionUnitsListContainer';
import AcquisitionUnitsList from './AcquisitionUnitsList';

jest.mock('./AcquisitionUnitsList', () => {
  return jest.fn(() => 'AcquisitionUnitsList');
});

const renderAcquisitionUnitsListContainer = ({
  resources = {},
  getViewPath = jest.fn(),
  getCreatePath = jest.fn(),
} = {}) => (render(
  <AcquisitionUnitsListContainer
    resources={resources}
    getViewPath={getViewPath}
    getCreatePath={getCreatePath}
  />,
));

describe('AcquisitionUnitsListContainer', () => {
  it('should display AcquisitionUnitsList', () => {
    const { getByText } = renderAcquisitionUnitsListContainer();

    expect(getByText('AcquisitionUnitsList')).toBeDefined();
  });

  it('should pass units from resources to AcquisitionUnitsList', () => {
    const records = [{
      id: 1,
      name: 'Finance manage',
    }];

    AcquisitionUnitsList.mockClear();
    renderAcquisitionUnitsListContainer({
      resources: {
        acquisitionUnits: { records },
      },
    });

    expect(AcquisitionUnitsList.mock.calls[0][0].acquisitionUnits).toEqual(records);
  });
});
