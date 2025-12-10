import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  render,
  screen,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  createAcquisitionsUnit,
  fetchAcquisitionsUnitById,
  updateAcquisitionsUnit,
} from '../utils/api';
import AcquisitionUnitEditorContainer, {
  NEW_UNIT_VALUES,
} from './AcquisitionUnitEditorContainer';
import AcquisitionUnitEditor from './AcquisitionUnitEditor';

jest.mock('../utils/api', () => ({
  createAcquisitionsUnit: jest.fn(),
  fetchAcquisitionsUnitById: jest.fn(),
  updateAcquisitionsUnit: jest.fn(),
}));
jest.mock('./AcquisitionUnitEditor', () => {
  return jest.fn(() => 'AcquisitionUnitEditor');
});

const defaultProps = {
  close: jest.fn(),
  match: {
    params: {},
    path: '',
    url: '',
  },
};

const queryClient = new QueryClient();

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const renderAcquisitionUnitEditorContainer = (props = {}) => render(
  <AcquisitionUnitEditorContainer
    {...defaultProps}
    {...props}
  />,
  { wrapper },
);

describe('AcquisitionUnitEditorContainer', () => {
  beforeEach(() => {
    createAcquisitionsUnit.mockImplementation(() => (data) => Promise.resolve(data));
    fetchAcquisitionsUnitById.mockImplementation(() => (id) => Promise.resolve({ id }));
    updateAcquisitionsUnit.mockImplementation(() => (data) => Promise.resolve(data));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display AcquisitionUnitEditor', () => {
    const { getByText } = renderAcquisitionUnitEditorContainer();

    expect(getByText('AcquisitionUnitEditor')).toBeInTheDocument();
  });

  it('should fetch acq unit when id is passed in params', async () => {
    renderAcquisitionUnitEditorContainer({
      match: {
        params: { id: 3 },
        path: '',
        url: '',
      },
    });

    await waitFor(() => expect(screen.getByText('AcquisitionUnitEditor')).toBeInTheDocument());

    expect(fetchAcquisitionsUnitById).toHaveBeenCalled();
    expect(AcquisitionUnitEditor.mock.calls[0][0].acquisitionUnit.id).toEqual(3);
  });

  it('should not fetch acq unit when id is not passed in params', () => {
    renderAcquisitionUnitEditorContainer();

    expect(fetchAcquisitionsUnitById).not.toHaveBeenCalled();
    expect(AcquisitionUnitEditor.mock.calls[0][0].acquisitionUnit).toEqual(NEW_UNIT_VALUES);
  });

  describe('Save unit', () => {
    it('should be passed as submit prop', () => {
      renderAcquisitionUnitEditorContainer();

      expect(AcquisitionUnitEditor.mock.calls[0][0].onSubmit).toBeDefined();
    });

    it('should make post request to save unit when id is not passed in params', async () => {
      renderAcquisitionUnitEditorContainer();

      await AcquisitionUnitEditor.mock.calls[0][0].onSubmit({});

      expect(createAcquisitionsUnit).toHaveBeenCalled();
    });

    it('should make put request to save unit when id is passed in params', async () => {
      renderAcquisitionUnitEditorContainer({
        match: {
          params: { id: 3 },
          path: '',
          url: '',
        },
      });

      await waitFor(() => expect(screen.getByText('AcquisitionUnitEditor')).toBeInTheDocument());

      await AcquisitionUnitEditor.mock.calls[0][0].onSubmit({});

      expect(updateAcquisitionsUnit).toHaveBeenCalled();
    });

    it('should close editor when unit is saved', async () => {
      const closeMock = jest.fn();

      renderAcquisitionUnitEditorContainer({ close: closeMock });

      await AcquisitionUnitEditor.mock.calls[0][0].onSubmit({});

      expect(closeMock).toHaveBeenCalled();
    });
  });
});
