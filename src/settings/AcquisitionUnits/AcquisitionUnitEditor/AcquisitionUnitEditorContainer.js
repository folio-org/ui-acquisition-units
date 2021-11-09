import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { get } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';
import {
  getErrorCodeFromResponse,
  useShowCallout,
} from '@folio/stripes-acq-components';

import {
  ACQUISITIONS_UNITS,
  ACQUISITIONS_UNIT,
} from '../resources';
import AcquisitionUnitEditor from './AcquisitionUnitEditor';

export const NEW_UNIT_VALUES = {
  protectUpdate: true,
  protectCreate: true,
  protectDelete: true,
};

const AcquisitionUnitEditorContainer = ({ match, mutator, resources, close }) => {
  const showCallout = useShowCallout();

  const id = get(match, ['params', 'id']);
  const acquisitionUnitInstance = id
    ? get(resources, 'acquisitionUnit.records.0', {})
    : NEW_UNIT_VALUES;

  const saveUnit = (values) => {
    const { acquisitionUnit, acquisitionUnits } = mutator;
    const saveMethod = id ? acquisitionUnit.PUT : acquisitionUnits.POST;

    return saveMethod({ ...acquisitionUnitInstance, ...values })
      .then(({ id: savedId }) => {
        close(savedId);
      })
      .catch(async (err) => {
        const errorCode = await getErrorCodeFromResponse(err);

        showCallout({
          messageId: `ui-acquisition-units.unit.actions.errors.save.${errorCode}`,
          type: 'error',
          values,
        });
      });
  };

  const onClose = () => close(id);

  return (
    <AcquisitionUnitEditor
      close={onClose}
      acquisitionUnit={acquisitionUnitInstance}
      initialValues={acquisitionUnitInstance}
      onSubmit={saveUnit}
    />
  );
};

AcquisitionUnitEditorContainer.manifest = Object.freeze({
  acquisitionUnits: {
    ...ACQUISITIONS_UNITS,
    fetch: false,
  },
  acquisitionUnit: ACQUISITIONS_UNIT,
});

AcquisitionUnitEditorContainer.propTypes = {
  close: PropTypes.func.isRequired,
  mutator: PropTypes.object.isRequired,
  resources: PropTypes.object.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

export default stripesConnect(AcquisitionUnitEditorContainer);
