import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';

import '@folio/stripes-acq-components/test/jest/__mock__';

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

    it('should not open confirmation modal when action is pressed', () => {
      const { queryByText, getByTestId } = renderAcquisitionUnitDetailsActions({ canDelete: false });

      user.click(getByTestId('ac-unit-details-delete-action'));

      expect(queryByText('ConfirmationModal')).toBeNull();
    });

    it('should open confirmation modal when action is pressed', () => {
      const { getByText, getByTestId } = renderAcquisitionUnitDetailsActions({ canDelete: true });

      user.click(getByTestId('ac-unit-details-delete-action'));

      expect(getByText('ConfirmationModal')).toBeDefined();
    });

    it('should close confirmation modal when delete is confirmed', () => {
      const { queryByText, getByTestId } = renderAcquisitionUnitDetailsActions({ canDelete: true });

      user.click(getByTestId('ac-unit-details-delete-action'));
      user.click(queryByText('ConfirmationModal'));

      expect(queryByText('ConfirmationModal')).toBeNull();
    });

    it('should delete unit when delete is confirmed', () => {
      const deleteUnit = jest.fn();
      const { queryByText, getByTestId } = renderAcquisitionUnitDetailsActions({
        canDelete: true,
        deleteUnit,
      });

      user.click(getByTestId('ac-unit-details-delete-action'));
      user.click(queryByText('ConfirmationModal'));

      expect(deleteUnit).toHaveBeenCalled();
    });
  });
});
