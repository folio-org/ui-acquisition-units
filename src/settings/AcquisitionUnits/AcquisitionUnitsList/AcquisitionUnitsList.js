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
  checkScope,
  HasCommand,
} from '@folio/stripes/components';
import {
  useStripes,
  IfPermission,
} from '@folio/stripes/core';

const AcquisitionUnitsList = ({ acquisitionUnits, getViewPath, getCreatePath }) => {
  const history = useHistory();
  const stripes = useStripes();

  const lastMenu = (
    <IfPermission perm="acquisitions-units.units.item.post">
      <Button
        data-test-new-ac-unit
        to={getCreatePath()}
        buttonStyle="primary"
        marginBottom0
      >
        <FormattedMessage id="ui-acquisition-units.unit.actions.new" />
      </Button>
    </IfPermission>
  );

  const goToAcquisitionUnit = useCallback((id) => (
    history.push(getViewPath(id))
  ), [getViewPath, history]);

  const shortcuts = [
    {
      name: 'new',
      handler: () => {
        if (stripes.hasPerm('acquisitions-units.units.item.post')) history.push(getCreatePath());
      },
    },
  ];

  return (
    <HasCommand
      commands={shortcuts}
      isWithinScope={checkScope}
      scope={document.body}
    >
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
    </HasCommand>
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
