import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';

import '@folio/stripes-acq-components/test/jest/__mock__';

import AcquisitionUnitsList from './AcquisitionUnitsList';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const renderAcquisitionUnitsList = ({
  acquisitionUnits = [],
  getViewPath = jest.fn(),
  getCreatePath = jest.fn(),
} = {}) => (render(
  <MemoryRouter>
    <AcquisitionUnitsList
      acquisitionUnits={acquisitionUnits}
      getViewPath={getViewPath}
      getCreatePath={getCreatePath}
    />
  </MemoryRouter>,
));

describe('AcquisitionUnitsList', () => {
  describe('Create unit', () => {
    it('should be displayed', () => {
      const { getByText } = renderAcquisitionUnitsList();

      expect(getByText('ui-acquisition-units.unit.actions.new')).toBeDefined();
    });

    it('should get create path from props', () => {
      const getCreatePath = jest.fn(() => '/');

      renderAcquisitionUnitsList({ getCreatePath });

      expect(getCreatePath).toHaveBeenCalled();
    });
  });

  describe('Acq units list', () => {
    it('should display acq units', () => {
      const acquisitionUnits = [
        { id: 1, name: 'Admins' },
        { id: 2, name: 'Finance managers' },
      ];
      const { getByText } = renderAcquisitionUnitsList({ acquisitionUnits });

      acquisitionUnits.forEach(unit => {
        expect(getByText(unit.name)).toBeDefined();
      });
    });

    it('should navigate to unit details when unit is pressed', () => {
      mockHistoryPush.mockClear();

      const acquisitionUnits = [
        { id: 1, name: 'Admins' },
      ];
      const viewPath = '/unit';
      const getViewPath = jest.fn(id => `${viewPath}/${id}`);
      const { getByText } = renderAcquisitionUnitsList({ acquisitionUnits, getViewPath });

      user.click(getByText(acquisitionUnits[0].name));

      expect(mockHistoryPush).toHaveBeenCalledWith(`${viewPath}/${acquisitionUnits[0].id}`);
    });
  });
});
