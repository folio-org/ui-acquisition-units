import React from 'react';
import { render } from '@testing-library/react';

import '@folio/stripes-acq-components/test/jest/__mock__';

import AcquisitionUnitDetails from './AcquisitionUnitDetails';
import AcquisitionUnitDetailsContainer from './AcquisitionUnitDetailsContainer';

jest.mock('./AcquisitionUnitDetails', () => {
  return jest.fn(() => 'AcquisitionUnitDetails');
});

const renderAcquisitionUnitDetailsContainer = ({
  resources = {},
  mutator = {},
  getEditPath = jest.fn(),
  close = jest.fn(),
} = {}) => (render(
  <AcquisitionUnitDetailsContainer
    resources={resources}
    mutator={mutator}
    close={close}
    getEditPath={getEditPath}
  />,
));

describe('AcquisitionUnitDetailsContainer', () => {
  beforeEach(() => {
    AcquisitionUnitDetails.mockClear();
  });

  it('should render Acquisition Unit Details', () => {
    const { getByText } = renderAcquisitionUnitDetailsContainer();

    expect(getByText('AcquisitionUnitDetails')).toBeDefined();
  });

  describe('Delete unit', () => {
    it('should send DELETE request via acquisitionUnits mutator', () => {
      const mutator = {
        acquisitionUnits: {
          DELETE: jest.fn(() => Promise.resolve()),
        },
      };

      renderAcquisitionUnitDetailsContainer({ mutator });

      AcquisitionUnitDetails.mock.calls[0][0].deleteUnit();

      expect(mutator.acquisitionUnits.DELETE).toHaveBeenCalled();
    });

    it('should call close when request is passed', async () => {
      const mutator = {
        acquisitionUnits: {
          DELETE: jest.fn(() => Promise.resolve()),
        },
      };
      const close = jest.fn();

      renderAcquisitionUnitDetailsContainer({ mutator, close });

      await AcquisitionUnitDetails.mock.calls[0][0].deleteUnit();

      expect(close).toHaveBeenCalled();
    });
  });
});
