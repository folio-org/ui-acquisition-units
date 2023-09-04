import { MemoryRouter } from 'react-router-dom';

import user from '@folio/jest-config-stripes/testing-library/user-event';
import { waitFor, render, act } from '@folio/jest-config-stripes/testing-library/react';
import { HasCommand } from '@folio/stripes/components';

import AcquisitionUnitsList from './AcquisitionUnitsList';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));
jest.mock('@folio/stripes-components/lib/Commander', () => ({
  HasCommand: jest.fn(({ children }) => <div>{children}</div>),
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

    it('should navigate to unit details when unit is pressed', async () => {
      mockHistoryPush.mockClear();

      const acquisitionUnits = [
        { id: 1, name: 'Admins' },
      ];
      const viewPath = '/unit';
      const getViewPath = jest.fn(id => `${viewPath}/${id}`);
      const { getByText } = renderAcquisitionUnitsList({ acquisitionUnits, getViewPath });

      await act(async () => user.click(getByText(acquisitionUnits[0].name)));

      expect(mockHistoryPush).toHaveBeenCalledWith(`${viewPath}/${acquisitionUnits[0].id}`);
    });
  });

  describe('Shortcuts', () => {
    it('should translate to creation form', async () => {
      renderAcquisitionUnitsList();

      await waitFor(() => HasCommand.mock.calls[0][0].commands.find(c => c.name === 'new').handler());

      expect(mockHistoryPush).toHaveBeenCalled();
    });
  });
});
