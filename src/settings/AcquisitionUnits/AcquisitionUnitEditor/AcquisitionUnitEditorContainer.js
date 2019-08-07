import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { get } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';

import {
  ACQUISITIONS_UNITS,
  ACQUISITIONS_UNIT,
} from '../resources';
import AcquisitionUnitEditor from './AcquisitionUnitEditor';

const NEW_UNIT_VALUES = {
  protectUpdate: true,
  protectCreate: true,
  protectDelete: true,
};

const AcquisitionUnitEditorContainer = ({ match, mutator, resources, close }) => {
  const id = get(match, ['params', 'id']);
  const acquisitionUnitInstance = id
    ? get(resources, 'acquisitionUnit.records.0', {})
    : NEW_UNIT_VALUES;

  const saveUnit = (values) => {
    const { acquisitionUnit, acquisitionUnits } = mutator;
    const saveMethod = id ? acquisitionUnit.PUT : acquisitionUnits.POST;

    saveMethod({ ...acquisitionUnitInstance, ...values }).then(({ id: savedId }) => {
      close(savedId);
    });
  };

  return (
    <AcquisitionUnitEditor
      close={close}
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
