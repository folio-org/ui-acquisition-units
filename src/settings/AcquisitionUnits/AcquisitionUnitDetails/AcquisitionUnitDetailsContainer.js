import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';

import { ACQUISITIONS_UNIT } from '../resources';
import AcquisitionUnitDetails from './AcquisitionUnitDetails';

const AcquisitionUnitDetailsContainer = ({ close, resources }) => {
  const acquisitionUnit = get(resources, 'acquisitionUnit.records.0', {});

  return (
    <AcquisitionUnitDetails
      close={close}
      acquisitionUnit={acquisitionUnit}
    />
  );
};

AcquisitionUnitDetailsContainer.manifest = Object.freeze({
  acquisitionUnit: ACQUISITIONS_UNIT,
});

AcquisitionUnitDetailsContainer.propTypes = {
  resources: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
};

export default stripesConnect(AcquisitionUnitDetailsContainer);
