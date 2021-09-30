import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Accordion,
  AccordionSet,
  AccordionStatus,
  Checkbox,
  Col,
  ExpandAllButton,
  KeyValue,
  Pane,
  Row,
  HasCommand,
  checkScope,
  collapseAllSections,
  expandAllSections,
} from '@folio/stripes/components';
import { ViewMetaData } from '@folio/stripes/smart-components';

import {
  ACCORDIONS,
  ACCORDION_LABELS,
} from '../constants';
import {
  initialState,
} from '../reducer';
import AcquisitionUnitMemberships from '../AcquisitionUnitMemberships';
import AcquisitionUnitDetailsActions from './AcquisitionUnitDetailsActions';

const AcquisitionUnitDetails = ({ acquisitionUnit, close, getEditPath, deleteUnit, canDelete }) => {
  const accordionStatusRef = useRef();
  const history = useHistory();

  const getActionMenu = () => {
    return (
      <AcquisitionUnitDetailsActions
        editUnitPath={getEditPath(acquisitionUnit.id)}
        deleteUnit={deleteUnit}
        canDelete={canDelete}
      />
    );
  };

  const shortcuts = [
    {
      name: 'edit',
      handler: () => history.push(getEditPath(acquisitionUnit.id)),
    },
    {
      name: 'expandAllSections',
      handler: (e) => expandAllSections(e, accordionStatusRef),
    },
    {
      name: 'collapseAllSections',
      handler: (e) => collapseAllSections(e, accordionStatusRef),
    },
  ];

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
      <Pane
        id="pane-ac-units-details"
        defaultWidth="fill"
        data-test-ac-unit-details
        paneTitle={acquisitionUnit.name}
        actionMenu={getActionMenu}
        dismissible
        onClose={close}
      >
        <AccordionStatus
          ref={accordionStatusRef}
          initialStatus={initialState.sections}
        >
          <Row
            center="xs"
            data-test-ac-unit-details-accordions
          >
            <Col xs={12}>
              <Row end="xs">
                <Col xs={12}>
                  <ExpandAllButton />
                </Col>
              </Row>
            </Col>
          </Row>

          <AccordionSet>
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
        </AccordionStatus>
      </Pane>
    </HasCommand>
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
