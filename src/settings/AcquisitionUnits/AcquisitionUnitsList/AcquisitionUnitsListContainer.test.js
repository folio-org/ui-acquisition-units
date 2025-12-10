import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import { render } from '@folio/jest-config-stripes/testing-library/react';

import AcquisitionUnitsListContainer from './AcquisitionUnitsListContainer';
import AcquisitionUnitsList from './AcquisitionUnitsList';

jest.mock('@folio/stripes-acq-components', () => ({
  useAcquisitionUnits: jest.fn(),
}));

const { useAcquisitionUnits } = require('@folio/stripes-acq-components');

jest.mock('./AcquisitionUnitsList', () => {
  return jest.fn(() => 'AcquisitionUnitsList');
});

const defaultProps = {
  getCreatePath: jest.fn(),
  getViewPath: jest.fn(),
};

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const renderAcquisitionUnitsListContainer = (props = {}) => (render(
  <AcquisitionUnitsListContainer
    {...defaultProps}
    {...props}
  />,
  { wrapper },
));

describe('AcquisitionUnitsListContainer', () => {
  beforeEach(() => {
    useAcquisitionUnits.mockReturnValue({ acquisitionsUnits: [], isLoading: false });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display AcquisitionUnitsList', () => {
    const { getByText } = renderAcquisitionUnitsListContainer();

    expect(getByText('AcquisitionUnitsList')).toBeDefined();
  });

  it('should pass units from resources to AcquisitionUnitsList', () => {
    const records = [{
      id: 1,
      name: 'Finance manage',
    }];

    useAcquisitionUnits.mockReturnValue({ acquisitionsUnits: records, isLoading: false });

    renderAcquisitionUnitsListContainer();

    expect(AcquisitionUnitsList.mock.calls[0][0].acquisitionUnits).toEqual(records);
  });
});
