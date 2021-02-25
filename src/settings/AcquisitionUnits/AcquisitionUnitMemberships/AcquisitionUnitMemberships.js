import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { noop } from 'lodash';
import { getFullName } from '@folio/stripes/util';

import {
  Row,
  Col,
  MultiColumnList,
  IconButton,
} from '@folio/stripes/components';

import AssignAcquisitionUnitMemberships from './AssignAcquisitionUnitMemberships';

const visibleColumns = ['name', 'patronGroup', 'actions'];
const columnMapping = {
  name: <FormattedMessage id="ui-acquisition-units.unit.membership.name" />,
  patronGroup: <FormattedMessage id="ui-acquisition-units.unit.membership.patronGroup" />,
  actions: '',
};
const columnWidths = {
  name: '50%',
  patronGroup: '40%',
  actions: '10%',
};

const AcquisitionUnitMemberships = ({ users, addMemberships, removeMembership, patronGroups }) => {
  const resultFormatter = {
    name: getFullName,
    patronGroup: item => patronGroups[item.patronGroup],
    actions: item => (
      <FormattedMessage id="ui-acquisition-units.unit.membership.actions.remove">
        {([label]) => (
          <IconButton
            data-testid="membership-action-remove"
            data-test-memberships-actions-remove
            icon="trash"
            onClick={() => removeMembership(item)}
            size="medium"
            ariaLabel={label}
          />
        )}
      </FormattedMessage>
    ),
  };

  return (
    <Fragment>
      <Row end="xs">
        <Col xs={12}>
          <AssignAcquisitionUnitMemberships addMemberships={addMemberships} />
        </Col>
      </Row>

      <Row
        start="xs"
        data-test-memberships
      >
        <Col xs={12}>
          <MultiColumnList
            contentData={users}
            formatter={resultFormatter}
            visibleColumns={visibleColumns}
            columnMapping={columnMapping}
            columnWidths={columnWidths}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

AcquisitionUnitMemberships.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  addMemberships: PropTypes.func,
  removeMembership: PropTypes.func,
  patronGroups: PropTypes.object,
};

AcquisitionUnitMemberships.defaultProps = {
  users: [],
  addMemberships: noop,
  removeMembership: noop,
  patronGroups: {},
};

export default AcquisitionUnitMemberships;
