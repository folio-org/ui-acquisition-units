import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { noop } from 'lodash';

import {
  NavList,
  NavListItem,
  Pane,
} from '@folio/stripes/components';

const AcquisitionUnitsList = ({ acquisitionUnits, getViewPath }) => {
  return (
    <Pane
      id="pane-ac-units-list"
      defaultWidth="fill"
      paneTitle={<FormattedMessage id="ui-acquisition-units.meta.title" />}
    >
      <NavList>
        {acquisitionUnits.map(acquisitionUnit => (
          <NavListItem
            key={acquisitionUnit.id}
            to={getViewPath(acquisitionUnit.id)}
          >
            {acquisitionUnit.name}
          </NavListItem>
        ))}
      </NavList>
    </Pane>
  );
};

AcquisitionUnitsList.propTypes = {
  acquisitionUnits: PropTypes.arrayOf(PropTypes.object),
  getViewPath: PropTypes.func,
};

AcquisitionUnitsList.defaultProps = {
  acquisitionUnits: [],
  getViewPath: noop,
};

export default AcquisitionUnitsList;
