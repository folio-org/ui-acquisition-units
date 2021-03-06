import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { noop } from 'lodash';
import { useHistory } from 'react-router-dom';

import {
  NavList,
  NavListItem,
  Pane,
  Button,
} from '@folio/stripes/components';

const AcquisitionUnitsList = ({ acquisitionUnits, getViewPath, getCreatePath }) => {
  const history = useHistory();

  const lastMenu = (
    <Button
      data-test-new-ac-unit
      to={getCreatePath()}
      buttonStyle="primary"
      marginBottom0
    >
      <FormattedMessage id="ui-acquisition-units.unit.actions.new" />
    </Button>
  );

  const goToAcquisitionUnit = useCallback((id) => (
    history.push(getViewPath(id))
  ), [getViewPath, history]);

  return (
    <Pane
      id="pane-ac-units-list"
      lastMenu={lastMenu}
      defaultWidth="fill"
      paneTitle={<FormattedMessage id="ui-acquisition-units.meta.title" />}
    >
      <NavList data-test-ac-units-nav-list>
        {acquisitionUnits.map((acquisitionUnit, i) => (
          <NavListItem
            key={acquisitionUnit.id}
            onClick={() => goToAcquisitionUnit(acquisitionUnit.id)}
            autoFocus={i === 0}
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
  getCreatePath: PropTypes.func,
};

AcquisitionUnitsList.defaultProps = {
  acquisitionUnits: [],
  getViewPath: noop,
  getCreatePath: noop,
};

export default AcquisitionUnitsList;
