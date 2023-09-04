import { MemoryRouter } from 'react-router-dom';

import { act, render } from '@folio/jest-config-stripes/testing-library/react';
import user from '@folio/jest-config-stripes/testing-library/user-event';

import AcquisitionUnitDetailsActions from './AcquisitionUnitDetailsActions';

jest.mock('@folio/stripes-components/lib/ConfirmationModal', () => {
  // eslint-disable-next-line react/prop-types
  return ({ onConfirm }) => (
    <button
      type="button"
      onClick={onConfirm}
    >
      ConfirmationModal
    </button>
  );
});

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

      await act(async () => user.click(getByTestId('ac-unit-details-delete-action')));

      expect(queryByText('ConfirmationModal')).toBeNull();
    });

    it('should open confirmation modal when action is pressed', async () => {
      const { getByText, getByTestId } = renderAcquisitionUnitDetailsActions({ canDelete: true });

      await act(async () => user.click(getByTestId('ac-unit-details-delete-action')));

      expect(getByText('ConfirmationModal')).toBeDefined();
    });

    it('should close confirmation modal when delete is confirmed', async () => {
      const { queryByText, getByTestId } = renderAcquisitionUnitDetailsActions({ canDelete: true });

      await act(async () => user.click(getByTestId('ac-unit-details-delete-action')));
      await act(async () => user.click(queryByText('ConfirmationModal')));

      expect(queryByText('ConfirmationModal')).toBeNull();
    });

    it('should delete unit when delete is confirmed', async () => {
      const deleteUnit = jest.fn();
      const { queryByText, getByTestId } = renderAcquisitionUnitDetailsActions({
        canDelete: true,
        deleteUnit,
      });

      await act(async () => user.click(getByTestId('ac-unit-details-delete-action')));
      await act(async () => user.click(queryByText('ConfirmationModal')));

      expect(deleteUnit).toHaveBeenCalled();
    });
  });
});
