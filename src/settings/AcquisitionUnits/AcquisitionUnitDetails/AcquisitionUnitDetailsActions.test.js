import { MemoryRouter } from 'react-router-dom';

import {
  act,
  render,
} from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import AcquisitionUnitDetailsActions from './AcquisitionUnitDetailsActions';

const renderAcquisitionUnitDetailsActions = ({
  editUnitPath = '/',
  deleteUnit = jest.fn(),
  canDelete = true,
} = {}) => (render(
  <MemoryRouter>
    <AcquisitionUnitDetailsActions
      editUnitPath={editUnitPath}
      deleteUnit={deleteUnit}
      canDelete={canDelete}
    />
  </MemoryRouter>,
));

describe('AcquisitionUnitDetails', () => {
  describe('Edit action', () => {
    it('should be rendered', () => {
      const { getByTestId } = renderAcquisitionUnitDetailsActions();

      expect(getByTestId('ac-unit-details-edit-action')).toBeDefined();
    });
  });

  describe('Delete action', () => {
    it('should be rendered', () => {
      const { getByTestId } = renderAcquisitionUnitDetailsActions();

      expect(getByTestId('ac-unit-details-delete-action')).toBeDefined();
    });

    it('should not open confirmation modal when action is pressed', async () => {
      const { queryByText, getByTestId } = renderAcquisitionUnitDetailsActions({ canDelete: false });

      await act(async () => userEvent.click(getByTestId('ac-unit-details-delete-action')));

      expect(queryByText(/unit.actions.delete.conformation.title/)).not.toBeInTheDocument();
    });

    it('should open confirmation modal when action is pressed', async () => {
      const { getByText, getByTestId } = renderAcquisitionUnitDetailsActions({ canDelete: true });

      await act(async () => userEvent.click(getByTestId('ac-unit-details-delete-action')));

      expect(getByText(/unit.actions.delete.conformation.title/)).toBeInTheDocument();
    });

    it('should close confirmation modal when delete is confirmed', async () => {
      const { queryByText, getByTestId } = renderAcquisitionUnitDetailsActions({ canDelete: true });

      await act(async () => userEvent.click(getByTestId('ac-unit-details-delete-action')));
      await act(async () => userEvent.click(queryByText(/delete.conformation.confirm/)));

      expect(queryByText(/unit.actions.delete.conformation.title/)).not.toBeInTheDocument();
    });

    it('should delete unit when delete is confirmed', async () => {
      const deleteUnit = jest.fn();
      const { queryByText, getByTestId } = renderAcquisitionUnitDetailsActions({
        canDelete: true,
        deleteUnit,
      });

      await act(async () => userEvent.click(getByTestId('ac-unit-details-delete-action')));
      await act(async () => userEvent.click(queryByText(/delete.conformation.confirm/)));

      expect(deleteUnit).toHaveBeenCalled();
    });
  });
});
