import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

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
  addMemberships = noop,
  isLoading = false,
  patronGroups = {},
  removeMembership = noop,
  users = [],
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
              disabled={isLoading}
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
            loading={isLoading}
          />
        </Col>
      </Row>
    </>
  );
};

AcquisitionUnitMemberships.propTypes = {
  addMemberships: PropTypes.func,
  isLoading: PropTypes.bool,
  patronGroups: PropTypes.object,
  removeMembership: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.object),
};

export default AcquisitionUnitMemberships;
