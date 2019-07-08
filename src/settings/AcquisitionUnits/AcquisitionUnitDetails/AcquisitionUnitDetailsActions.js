import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Icon,
  ConfirmationModal,
} from '@folio/stripes/components';

const AcquisitionUnitDetailsActions = ({ deleteUnit, editUnitPath }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const toggleConfirmationDelete = () => setShowConfirmDelete(!showConfirmDelete);

  const confirmDeleteUnit = () => {
    toggleConfirmationDelete();
    deleteUnit();
  };

  return (
    <Fragment>
      <div>
        <Button
          buttonStyle="dropdownItem"
          to={editUnitPath}
          data-test-ac-unit-details-edit-action
        >
          <Icon icon="edit">
            <FormattedMessage id="ui-acquisition-units.unit.actions.edit" />
          </Icon>
        </Button>
        <Button
          buttonStyle="dropdownItem"
          onClick={toggleConfirmationDelete}
        >
          <Icon icon="trash">
            <FormattedMessage id="ui-acquisition-units.unit.actions.delete" />
          </Icon>
        </Button>
      </div>
      {
        showConfirmDelete && (
          <ConfirmationModal
            id="delete-ac-unit-modal"
            confirmLabel={<FormattedMessage id="ui-acquisition-units.unit.actions.delete.conformation.confirm" />}
            heading={<FormattedMessage id="ui-acquisition-units.unit.actions.delete.conformation.title" />}
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
};

export default AcquisitionUnitDetailsActions;
