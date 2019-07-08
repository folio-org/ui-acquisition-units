import React, { useReducer } from 'react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Pane,
  Layer,
  ExpandAllButton,
  Row,
  Col,
  AccordionSet,
  Accordion,
  PaneMenu,
  Button,
  TextField,
  Checkbox,
} from '@folio/stripes/components';
import { ViewMetaData } from '@folio/stripes/smart-components';
import stripesForm from '@folio/stripes/form';

import {
  ACTIONS,
  ACCORDIONS,
  ACCORDION_LABELS,
} from '../constants';
import {
  initialState,
  reducer,
} from '../reducer';

const getPaneTitle = name => (
  name
    ? (
      <FormattedMessage
        id="ui-acquisition-units.unit.form.edit.title"
        values={{ name }}
      />
    )
    : <FormattedMessage id="ui-acquisition-units.unit.form.create.title" />
);

const AcquisitionUnitEditor = ({ acquisitionUnit, close, handleSubmit, pristine, submitting }) => {
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

  const getLastMenu = () => {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-acquisition-units.unit.actions.save">
          {ariaLabel => (
            <Button
              id="save-ac-unit-button"
              data-test-save-ac-unit
              type="submit"
              disabled={pristine || submitting}
              marginBottom0
            >
              {ariaLabel}
            </Button>
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  };

  return (
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
          paneTitle={getPaneTitle(acquisitionUnit.name)}
          dismissible
          onClose={close}
          lastMenu={getLastMenu()}
        >
          <Row center="xs">
            <Col xs={12} md={8}>
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

          <Row center="xs">
            <Col xs={12} md={8}>
              <AccordionSet
                accordionStatus={state.sections}
                onToggle={toggleSection}
              >
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
              </AccordionSet>
            </Col>
          </Row>
        </Pane>
      </form>
    </Layer>
  );
};

AcquisitionUnitEditor.propTypes = {
  acquisitionUnit: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default stripesForm({
  enableReinitialize: true,
  form: 'acUnitForm',
  navigationCheck: true,
})(AcquisitionUnitEditor);
