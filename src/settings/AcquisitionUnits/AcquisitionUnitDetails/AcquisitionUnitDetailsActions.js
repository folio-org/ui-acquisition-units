import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  Button,
  Icon,
  ConfirmationModal,
} from '@folio/stripes/components';
import { IfPermission } from '@folio/stripes/core';

const AcquisitionUnitDetailsActions = ({
  deleteUnit,
  canDelete = true,
  editUnitPath,
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const intl = useIntl();

  const modalLabel = intl.formatMessage({ id: 'ui-acquisition-units.unit.actions.delete.conformation.title' });

  const toggleConfirmationDelete = () => setShowConfirmDelete(!showConfirmDelete);

  const confirmDeleteUnit = () => {
    toggleConfirmationDelete();
    deleteUnit();
  };

  return (
    <Fragment>
      <div>
        <IfPermission perm="acquisitions-units.units.item.put">
          <Button
            buttonStyle="dropdownItem"
            to={editUnitPath}
            data-test-ac-unit-details-edit-action
            data-testid="ac-unit-details-edit-action"
          >
            <Icon icon="edit">
              <FormattedMessage id="ui-acquisition-units.unit.actions.edit" />
            </Icon>
          </Button>
        </IfPermission>
        <IfPermission perm="acquisitions-units.units.item.delete">
          <Button
            buttonStyle="dropdownItem"
            onClick={toggleConfirmationDelete}
            disabled={!canDelete}
            data-testid="ac-unit-details-delete-action"
          >
            <Icon icon="trash">
              {
                canDelete
                  ? <FormattedMessage id="ui-acquisition-units.unit.actions.delete" />
                  : <FormattedMessage id="ui-acquisition-units.unit.actions.delete.forbidden" />
              }
            </Icon>
          </Button>
        </IfPermission>
      </div>
      {
        showConfirmDelete && (
          <ConfirmationModal
            aria-label={modalLabel}
            id="delete-ac-unit-modal"
            confirmLabel={<FormattedMessage id="ui-acquisition-units.unit.actions.delete.conformation.confirm" />}
            heading={modalLabel}
            message={<FormattedMessage id="ui-acquisition-units.unit.actions.delete.conformation.message" />}
            onCancel={toggleConfirmationDelete}
            onConfirm={confirmDeleteUnit}
            open
          />
        )
      }
    </Fragment>
  );
};

AcquisitionUnitDetailsActions.propTypes = {
  deleteUnit: PropTypes.func.isRequired,
  editUnitPath: PropTypes.string.isRequired,
  canDelete: PropTypes.bool,
};

export default AcquisitionUnitDetailsActions;
