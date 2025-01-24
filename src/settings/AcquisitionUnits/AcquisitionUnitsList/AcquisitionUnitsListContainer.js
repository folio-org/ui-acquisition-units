import React from 'react';
import PropTypes from 'prop-types';
import { get, noop } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';

import { ACQUISITIONS_UNITS } from '../resources';
import AcquisitionUnitsList from './AcquisitionUnitsList';

const AcquisitionUnitsListContainer = ({
  resources,
  getViewPath = noop,
  getCreatePath = noop,
}) => {
  const acquisitionUnits = get(resources, 'acquisitionUnits.records', []);

  return (
    <AcquisitionUnitsList
      acquisitionUnits={acquisitionUnits}
      getViewPath={getViewPath}
      getCreatePath={getCreatePath}
    />
  );
};

AcquisitionUnitsListContainer.manifest = Object.freeze({
  acquisitionUnits: ACQUISITIONS_UNITS,
});

AcquisitionUnitsListContainer.propTypes = {
  resources: PropTypes.object.isRequired,
  getViewPath: PropTypes.func,
  getCreatePath: PropTypes.func,
};

export default stripesConnect(AcquisitionUnitsListContainer);
