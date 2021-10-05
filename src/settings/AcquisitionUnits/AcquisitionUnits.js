import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import {
  CommandList,
  defaultKeyboardShortcuts,
} from '@folio/stripes/components';

import AcquisitionUnitsList from './AcquisitionUnitsList';
import AcquisitionUnitDetails from './AcquisitionUnitDetails';
import AcquisitionUnitEditor from './AcquisitionUnitEditor';

const AcquisitionUnits = ({ match, history }) => {
  const { path } = match;
  const createPath = `${path}/create`;

  const getCreatePath = () => createPath;
  const getViewPath = acquisitionUnitId => `${path}/${acquisitionUnitId}/view`;
  const getEditPath = acquisitionUnitId => `${path}/${acquisitionUnitId}/edit`;

  const closePane = id => history.push(id ? getViewPath(id) : path);

  return (
    <CommandList
      commands={defaultKeyboardShortcuts}
    >
      <Switch>
        <Route
          path={createPath}
          render={(props) => (
            <AcquisitionUnitEditor
              close={closePane}
              location={props.location}
              match={props.match}
            />
          )}
        />
        <Route
          path={getEditPath(':id')}
          render={(props) => (
            <AcquisitionUnitEditor
              close={closePane}
              location={props.location}
              match={props.match}
            />
          )}
        />
        <Route
          path={path}
          render={() => (
            <>
              <AcquisitionUnitsList
                getViewPath={getViewPath}
                getCreatePath={getCreatePath}
              />
              <Route
                exact
                path={getViewPath(':id')}
                render={(props) => (
                  <AcquisitionUnitDetails
                    getEditPath={getEditPath}
                    location={props.location}
                    close={closePane}
                    match={props.match}
                  />
                )}
              />
            </>
          )}
        />
      </Switch>
    </CommandList>
  );
};

AcquisitionUnits.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default AcquisitionUnits;
