import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';

import { ACQUISITIONS_UNIT, ACQUISITIONS_UNITS } from '../resources';
import AcquisitionUnitDetails from './AcquisitionUnitDetails';

const AcquisitionUnitDetailsContainer = ({ getEditPath, close, resources, mutator }) => {
  const acquisitionUnitInstance = get(resources, 'acquisitionUnit.records.0', {});
  const deleteUnit = () => {
    const { acquisitionUnits } = mutator;

    acquisitionUnits.DELETE({ id: acquisitionUnitInstance.id }).then(close);
  };

  return (
    <AcquisitionUnitDetails
      close={close}
      acquisitionUnit={acquisitionUnitInstance}
      getEditPath={getEditPath}
      deleteUnit={deleteUnit}
    />
  );
};

AcquisitionUnitDetailsContainer.manifest = Object.freeze({
  acquisitionUnits: {
    ...ACQUISITIONS_UNITS,
    fetch: false,
  },
  acquisitionUnit: ACQUISITIONS_UNIT,
});

AcquisitionUnitDetailsContainer.propTypes = {
  mutator: PropTypes.object.isRequired,
  resources: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  getEditPath: PropTypes.func.isRequired,
};

export default stripesConnect(AcquisitionUnitDetailsContainer);
