import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { useParams } from 'react-router-dom';

import { render } from '@folio/jest-config-stripes/testing-library/react';

import * as api from '../utils/api';
import AcquisitionUnitDetails from './AcquisitionUnitDetails';
import AcquisitionUnitDetailsContainer from './AcquisitionUnitDetailsContainer';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('../utils/api');

jest.mock('./AcquisitionUnitDetails', () => {
  return jest.fn(() => 'AcquisitionUnitDetails');
});

const defaultProps = {
  close: jest.fn(),
  getEditPath: jest.fn(),
};

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const renderAcquisitionUnitDetailsContainer = (props = {}) => (render(
  <AcquisitionUnitDetailsContainer
    {...defaultProps}
    {...props}
  />,
  { wrapper },
));

describe('AcquisitionUnitDetailsContainer', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: 3 });

    api.fetchAcquisitionsUnitById.mockReturnValue(jest.fn().mockResolvedValue({ id: 3, name: 'Test Unit' }));
    api.fetchMemberships.mockReturnValue(jest.fn().mockResolvedValue([]));
    api.deleteAcquisitionsUnit.mockReturnValue(jest.fn().mockResolvedValue({ id: 3 }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Acquisition Unit Details', () => {
    const { getByText } = renderAcquisitionUnitDetailsContainer();

    expect(getByText('AcquisitionUnitDetails')).toBeDefined();
  });

  describe('Delete unit', () => {
    it('should call deleteAcquisitionsUnit API function', async () => {
      renderAcquisitionUnitDetailsContainer();

      await AcquisitionUnitDetails.mock.calls[0][0].deleteUnit();

      expect(api.deleteAcquisitionsUnit).toHaveBeenCalled();
    });

    it('should call close when request is passed', async () => {
      renderAcquisitionUnitDetailsContainer();

      await AcquisitionUnitDetails.mock.calls[0][0].deleteUnit();

      expect(defaultProps.close).toHaveBeenCalled();
    });
  });
});
