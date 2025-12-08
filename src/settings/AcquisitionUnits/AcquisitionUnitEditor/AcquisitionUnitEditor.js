import PropTypes from 'prop-types';
import { useRef } from 'react';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';
import { Field } from 'redux-form';

import {
  Accordion,
  AccordionSet,
  AccordionStatus,
  Button,
  checkScope,
  Checkbox,
  Col,
  collapseAllSections,
  ExpandAllButton,
  expandAllSections,
  HasCommand,
  Layer,
  Pane,
  PaneMenu,
  Row,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import { TitleManager } from '@folio/stripes/core';
import { ViewMetaData } from '@folio/stripes/smart-components';
import stripesForm from '@folio/stripes/form';
import { handleKeyCommand } from '@folio/stripes-acq-components';

import AcquisitionUnitMemberships from '../AcquisitionUnitMemberships';
import {
  ACCORDIONS,
  ACCORDION_LABELS,
} from '../constants';
import { initialState } from '../reducer';

const getPaneTitle = (name, intl) => (
  name
    ? intl.formatMessage({ id: 'ui-acquisition-units.unit.form.edit.title' }, { name })
    : intl.formatMessage({ id: 'ui-acquisition-units.unit.form.create.title' })
);

const AcquisitionUnitEditor = ({
  acquisitionUnit,
  close,
  handleSubmit,
  isLoading,
  pristine,
  submitting,
}) => {
  const accordionStatusRef = useRef();
  const intl = useIntl();

  const paneTitle = getPaneTitle(acquisitionUnit.name, intl);

  const getLastMenu = () => {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-acquisition-units.unit.actions.save">
          {ariaLabel => (
            <Button
              id="save-ac-unit-button"
              data-test-save-ac-unit
              type="submit"
              disabled={pristine || submitting || isLoading}
              marginBottom0
            >
              {ariaLabel}
            </Button>
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  };

  const shortcuts = [
    {
      name: 'cancel',
      shortcut: 'esc',
      handler: handleKeyCommand(close),
    },
    {
      name: 'save',
      handler: handleKeyCommand(handleSubmit, { disabled: pristine || submitting }),
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
    <TitleManager record={paneTitle}>
      <HasCommand
        commands={shortcuts}
        isWithinScope={checkScope}
        scope={document.body}
      >
        <Layer
          contentLabel="Acquisition unit editor"
          isOpen
        >
          <form
            id="ac-unit-form"
            data-test-ac-unit-form
            onSubmit={handleSubmit}
          >
            <Pane
              id="pane-ac-unit-editor"
              data-test-ac-unit-form-pane
              defaultWidth="fill"
              paneTitle={paneTitle}
              dismissible
              onClose={close}
              lastMenu={getLastMenu()}
            >
              <AccordionStatus
                ref={accordionStatusRef}
                initialStatus={initialState}
              >
                <Row center="xs">
                  <Col xs={12} md={8}>
                    <Row end="xs">
                      <Col xs={12}>
                        <ExpandAllButton />
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row center="xs">
                  <Col xs={12} md={8}>
                    <AccordionSet>
                      <Accordion
                        label={ACCORDION_LABELS[ACCORDIONS.GENERAL_INFO]}
                        id={ACCORDIONS.GENERAL_INFO}
                      >
                        <Row start="xs">
                          <Col xs={12}>
                            {acquisitionUnit.metadata && <ViewMetaData metadata={acquisitionUnit.metadata} />}
                          </Col>
                        </Row>

                        <Row start="xs">
                          <Col xs={4}>
                            <Field
                              component={TextField}
                              label={<FormattedMessage id="ui-acquisition-units.unit.name" />}
                              name="name"
                              type="text"
                              required
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={8}>
                            <Field
                              label={<FormattedMessage id="ui-acquisition-units.unit.description" />}
                              name="description"
                              component={TextArea}
                              fullWidth
                            />
                          </Col>
                        </Row>
                      </Accordion>

                      <Accordion
                        label={ACCORDION_LABELS[ACCORDIONS.ACTION_PERMISSIONS]}
                        id={ACCORDIONS.ACTION_PERMISSIONS}
                      >
                        <Row
                          start="xs"
                          data-row-ac-unit-protected-read
                        >
                          <Col xs={4}>
                            <Field
                              component={Checkbox}
                              label={<FormattedMessage id="ui-acquisition-units.unit.viewPermission" />}
                              name="protectRead"
                              type="checkbox"
                            />
                          </Col>
                        </Row>

                        <Row
                          start="xs"
                          data-row-ac-unit-protected-updated
                        >
                          <Col xs={4}>
                            <Field
                              component={Checkbox}
                              label={<FormattedMessage id="ui-acquisition-units.unit.editPermission" />}
                              name="protectUpdate"
                              type="checkbox"
                            />
                          </Col>
                        </Row>

                        <Row
                          start="xs"
                          data-row-ac-unit-protected-create
                        >
                          <Col xs={4}>
                            <Field
                              component={Checkbox}
                              label={<FormattedMessage id="ui-acquisition-units.unit.createPermission" />}
                              name="protectCreate"
                              type="checkbox"
                            />
                          </Col>
                        </Row>

                        <Row
                          start="xs"
                          data-row-ac-unit-protected-delete
                        >
                          <Col xs={4}>
                            <Field
                              component={Checkbox}
                              label={<FormattedMessage id="ui-acquisition-units.unit.deletePermission" />}
                              name="protectDelete"
                              type="checkbox"
                            />
                          </Col>
                        </Row>
                      </Accordion>

                      {
                        Boolean(acquisitionUnit.id) && (
                          <Accordion
                            label={ACCORDION_LABELS[ACCORDIONS.MEMBERSHIPS]}
                            id={ACCORDIONS.MEMBERSHIPS}
                          >
                            <Row start="xs">
                              <Col xs={12}>
                                <AcquisitionUnitMemberships />
                              </Col>
                            </Row>
                          </Accordion>
                        )
                      }
                    </AccordionSet>
                  </Col>
                </Row>
              </AccordionStatus>
            </Pane>
          </form>
        </Layer>
      </HasCommand>
    </TitleManager>
  );
};

AcquisitionUnitEditor.propTypes = {
  acquisitionUnit: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default stripesForm({
  enableReinitialize: true,
  form: 'acUnitForm',
  navigationCheck: true,
})(AcquisitionUnitEditor);
