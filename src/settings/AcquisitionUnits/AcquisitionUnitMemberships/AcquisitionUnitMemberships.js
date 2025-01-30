import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { noop } from 'lodash';

import { IfPermission } from '@folio/stripes/core';
import {
  Row,
  Col,
  MultiColumnList,
  IconButton,
} from '@folio/stripes/components';

import AssignAcquisitionUnitMemberships from './AssignAcquisitionUnitMemberships';

const visibleColumns = ['fullName', 'patronGroup', 'actions'];
const columnMapping = {
  fullName: <FormattedMessage id="ui-acquisition-units.unit.membership.name" />,
  patronGroup: <FormattedMessage id="ui-acquisition-units.unit.membership.patronGroup" />,
  actions: '',
};
const columnWidths = {
  fullName: '50%',
  patronGroup: '40%',
  actions: '10%',
};

const AcquisitionUnitMemberships = ({
  users = [],
  addMemberships = noop,
  removeMembership = noop,
  patronGroups = {},
}) => {
  const resultFormatter = {
    patronGroup: item => patronGroups[item.patronGroup],
    actions: item => (
      <IfPermission perm="acquisitions-units.memberships.item.delete">
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
      </IfPermission>
    ),
  };

  return (
    <>
      <Row end="xs">
        <Col xs={12}>
          <IfPermission perm="acquisitions-units.memberships.item.post">
            <AssignAcquisitionUnitMemberships addMemberships={addMemberships} />
          </IfPermission>
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
    </>
  );
};

AcquisitionUnitMemberships.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  addMemberships: PropTypes.func,
  removeMembership: PropTypes.func,
  patronGroups: PropTypes.object,
};

export default AcquisitionUnitMemberships;
