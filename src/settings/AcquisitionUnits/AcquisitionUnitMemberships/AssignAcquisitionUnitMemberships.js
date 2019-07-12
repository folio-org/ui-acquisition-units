import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Pluggable,
  withStripes,
} from '@folio/stripes/core';

import styles from './AssignAcquisitionUnitMemberships.css';

const buttonLabel = <FormattedMessage id="ui-acquisition-units.unit.membership.actions.assign" />;

const AssignAcquisitionUnitMemberships = ({ addMemberships, stripes }) => {
  return (
    <div className={styles.AssignAcquisitionUnitMembershipsWrapper}>
      <Pluggable
        aria-haspopup="true"
        dataKey="acUnitMembership"
        searchButtonStyle="default"
        searchLabel={buttonLabel}
        stripes={stripes}
        type="find-user"
        selectUsers={addMemberships}
      >
        <FormattedMessage id="ui-acquisition-units.unit.membership.actions.assign.notAvailable" />
      </Pluggable>
    </div>
  );
};

AssignAcquisitionUnitMemberships.propTypes = {
  addMemberships: PropTypes.func.isRequired,
  stripes: PropTypes.object.isRequired,
};

export default withStripes(AssignAcquisitionUnitMemberships);
