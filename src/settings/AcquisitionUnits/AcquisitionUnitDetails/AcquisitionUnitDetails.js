import React, { useReducer } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Accordion,
  AccordionSet,
  Checkbox,
  Col,
  ExpandAllButton,
  KeyValue,
  Pane,
  Row,
} from '@folio/stripes/components';
import { ViewMetaData } from '@folio/stripes/smart-components';

import {
  ACTIONS,
  ACCORDIONS,
  ACCORDION_LABELS,
} from '../constants';
import {
  initialState,
  reducer,
} from '../reducer';
import AcquisitionUnitMemberships from '../AcquisitionUnitMemberships';
import AcquisitionUnitDetailsActions from './AcquisitionUnitDetailsActions';

const AcquisitionUnitDetails = ({ acquisitionUnit, close, getEditPath, deleteUnit, canDelete }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleSection = ({ id }) => {
    dispatch({
      payload: id,
      type: ACTIONS.TOGGLE_SECTION,
    });
  };

  const handleExpandAll = (sections) => {
    dispatch({
      payload: sections,
      type: ACTIONS.HANDLE_EXPAND_ALL,
    });
  };

  const getActionMenu = () => {
    return (
      <AcquisitionUnitDetailsActions
        editUnitPath={getEditPath(acquisitionUnit.id)}
        deleteUnit={deleteUnit}
        canDelete={canDelete}
      />
    );
  };

  return (
    <Pane
      id="pane-ac-units-details"
      defaultWidth="fill"
      data-test-ac-unit-details
      paneTitle={acquisitionUnit.name}
      actionMenu={getActionMenu}
      dismissible
      onClose={close}
    >
      <Row
        center="xs"
        data-test-ac-unit-details-accordions
      >
        <Col xs={12}>
          <Row end="xs">
            <Col xs={12}>
              <ExpandAllButton
                accordionStatus={state.sections}
                onToggle={handleExpandAll}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <AccordionSet
        accordionStatus={state.sections}
        onToggle={toggleSection}
      >
        <Accordion
          label={ACCORDION_LABELS[ACCORDIONS.GENERAL_INFO]}
          id={ACCORDIONS.GENERAL_INFO}
        >
          {acquisitionUnit.metadata && <ViewMetaData metadata={acquisitionUnit.metadata} />}

          <Row data-row-unit-name>
            <Col xs={12}>
              <KeyValue
                label={<FormattedMessage id="ui-acquisition-units.unit.name" />}
                value={acquisitionUnit.name}
              />
            </Col>
          </Row>

          <Row data-row-unit-description>
            <Col xs={12}>
              <KeyValue
                label={<FormattedMessage id="ui-acquisition-units.unit.description" />}
                value={acquisitionUnit.description}
              />
            </Col>
          </Row>
        </Accordion>

        <Accordion
          label={ACCORDION_LABELS[ACCORDIONS.ACTION_PERMISSIONS]}
          id={ACCORDIONS.ACTION_PERMISSIONS}
        >
          <Row>
            <Col
              xs={3}
              data-col-unit-protect-read
            >
              <KeyValue label={<FormattedMessage id="ui-acquisition-units.unit.viewPermission" />}>
                <Checkbox
                  checked={acquisitionUnit.protectRead}
                  disabled
                />
              </KeyValue>
            </Col>

            <Col
              xs={3}
              data-col-unit-protect-update
            >
              <KeyValue label={<FormattedMessage id="ui-acquisition-units.unit.editPermission" />}>
                <Checkbox
                  checked={acquisitionUnit.protectUpdate}
                  disabled
                />
              </KeyValue>
            </Col>

            <Col
              xs={3}
              data-col-unit-protect-create
            >
              <KeyValue label={<FormattedMessage id="ui-acquisition-units.unit.createPermission" />}>
                <Checkbox
                  checked={acquisitionUnit.protectCreate}
                  disabled
                />
              </KeyValue>
            </Col>

            <Col
              xs={3}
              data-col-unit-protect-delete
            >
              <KeyValue label={<FormattedMessage id="ui-acquisition-units.unit.deletePermission" />}>
                <Checkbox
                  checked={acquisitionUnit.protectDelete}
                  disabled
                />
              </KeyValue>
            </Col>
          </Row>
        </Accordion>

        <Accordion
          label={ACCORDION_LABELS[ACCORDIONS.MEMBERSHIPS]}
          id={ACCORDIONS.MEMBERSHIPS}
        >
          <Row
            start="xs"
            data-row-ac-unit-memberships
          >
            <Col xs={12}>
              <AcquisitionUnitMemberships />
            </Col>
          </Row>
        </Accordion>
      </AccordionSet>
    </Pane>
  );
};

AcquisitionUnitDetails.propTypes = {
  acquisitionUnit: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  getEditPath: PropTypes.func.isRequired,
  deleteUnit: PropTypes.func.isRequired,
  canDelete: PropTypes.bool,
};

AcquisitionUnitDetails.defaultProps = {
  canDelete: true,
};

export default AcquisitionUnitDetails;
