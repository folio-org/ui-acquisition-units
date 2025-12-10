import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { LoadingView } from '@folio/stripes/components';
import {
  getErrorCodeFromResponse,
  useShowCallout,
} from '@folio/stripes-acq-components';

import {
  useAcquisitionsUnit,
  useAcquisitionsUnitMutation,
} from '../hooks';
import AcquisitionUnitEditor from './AcquisitionUnitEditor';

export const NEW_UNIT_VALUES = {
  protectUpdate: true,
  protectCreate: true,
  protectDelete: true,
};

const AcquisitionUnitEditorContainer = ({
  close,
  match,
}) => {
  const id = match?.params?.id;

  const showCallout = useShowCallout();

  const {
    acquisitionsUnit,
    isFetching: isAcqUnitFetching,
  } = useAcquisitionsUnit(id);

  const {
    createAcquisitionsUnit,
    updateAcquisitionsUnit,
    isLoading: isMutatingAcquisitionsUnit,
  } = useAcquisitionsUnitMutation();

  const acquisitionUnitInstance = id ? acquisitionsUnit : NEW_UNIT_VALUES;

  const saveUnit = (values) => {
    const saveMethod = id ? updateAcquisitionsUnit : createAcquisitionsUnit;

    return saveMethod({ data: { ...acquisitionUnitInstance, ...values } })
      .then((response) => {
        close(id || response.id);
      })
      .catch(async (err) => {
        const errorCode = await getErrorCodeFromResponse(err);

        showCallout({
          messageId: `ui-acquisition-units.unit.actions.errors.save.${errorCode}`,
          type: 'error',
          values: { name: values.name },
        });
      });
  };

  const onClose = () => close(id);

  if (isAcqUnitFetching) {
    // TODO: apply title manager https://folio-org.atlassian.net/browse/UIAC-90
    return (
      <LoadingView />
    );
  }

  return (
    <AcquisitionUnitEditor
      close={onClose}
      acquisitionUnit={acquisitionUnitInstance}
      initialValues={acquisitionUnitInstance}
      isLoading={isMutatingAcquisitionsUnit}
      onSubmit={saveUnit}
    />
  );
};

AcquisitionUnitEditorContainer.propTypes = {
  close: PropTypes.func.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

export default AcquisitionUnitEditorContainer;
