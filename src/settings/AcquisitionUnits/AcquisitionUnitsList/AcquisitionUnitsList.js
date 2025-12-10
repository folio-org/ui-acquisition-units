import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import {
  Button,
  checkScope,
  HasCommand,
  NavList,
  NavListItem,
  Pane,
} from '@folio/stripes/components';
import {
  IfPermission,
  useStripes,
} from '@folio/stripes/core';

const AcquisitionUnitsList = ({
  acquisitionUnits = [],
  getCreatePath = noop,
  getViewPath = noop,
}) => {
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
  getCreatePath: PropTypes.func,
  getViewPath: PropTypes.func,
};

export default AcquisitionUnitsList;
