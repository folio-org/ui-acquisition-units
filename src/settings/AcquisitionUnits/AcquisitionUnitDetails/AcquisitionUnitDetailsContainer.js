import PropTypes from 'prop-types';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

import { useNamespace } from '@folio/stripes/core';

import {
  useAcquisitionsUnit,
  useAcquisitionsUnitMemberships,
  useAcquisitionsUnitMutation,
} from '../hooks';
import AcquisitionUnitDetails from './AcquisitionUnitDetails';

const AcquisitionUnitDetailsContainer = ({
  close,
  getEditPath,
}) => {
  const { id } = useParams();
  const [acqUnitsNamespace] = useNamespace({ key: 'acquisitions-units' });
  const queryClient = useQueryClient();

  const {
    acquisitionsUnit,
    isFetched: isAcqUnitFetched,
    isFetching: isAcqUnitFetching,
  } = useAcquisitionsUnit(id);

  const {
    isFetching: isAcqUnitMembershipsFetching,
    isLoading: isAcqUnitMembershipsLoading,
    memberships,
  } = useAcquisitionsUnitMemberships(id, { enabled: isAcqUnitFetched });

  const {
    deleteAcquisitionsUnit,
    isLoading: isDeletingAcquisitionsUnit,
  } = useAcquisitionsUnitMutation();

  const deleteUnit = async () => {
    await deleteAcquisitionsUnit({ id: acquisitionsUnit?.id });
    queryClient.invalidateQueries(acqUnitsNamespace);
    close();
  };

  const isLoading = (
    isAcqUnitFetching
    || isAcqUnitMembershipsLoading
    || isDeletingAcquisitionsUnit
  );

  return (
    <AcquisitionUnitDetails
      acquisitionUnit={acquisitionsUnit}
      canDelete={!isAcqUnitMembershipsFetching && memberships.length === 0}
      close={close}
      deleteUnit={deleteUnit}
      isLoading={isLoading}
      getEditPath={getEditPath}
    />
  );
};

AcquisitionUnitDetailsContainer.propTypes = {
  close: PropTypes.func.isRequired,
  getEditPath: PropTypes.func.isRequired,
};

export default AcquisitionUnitDetailsContainer;
