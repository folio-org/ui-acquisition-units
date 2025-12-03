import noop from 'lodash/noop';
import PropTypes from 'prop-types';

import { LoadingPane } from '@folio/stripes/components';
import { useAcquisitionUnits } from '@folio/stripes-acq-components';

import AcquisitionUnitsList from './AcquisitionUnitsList';

const AcquisitionUnitsListContainer = ({
  getCreatePath = noop,
  getViewPath = noop,
}) => {
  const {
    acquisitionsUnits,
    isLoading,
  } = useAcquisitionUnits();

  if (isLoading) {
    // TODO: apply title manager for a11y https://folio-org.atlassian.net/browse/UIAC-90
    return <LoadingPane />;
  }

  return (
    <AcquisitionUnitsList
      acquisitionUnits={acquisitionsUnits}
      getCreatePath={getCreatePath}
      getViewPath={getViewPath}
    />
  );
};

AcquisitionUnitsListContainer.propTypes = {
  getViewPath: PropTypes.func,
  getCreatePath: PropTypes.func,
};

export default AcquisitionUnitsListContainer;
