import React, { Fragment } from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import ReactRouterPropTypes from 'react-router-prop-types';

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
          <Fragment>
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
          </Fragment>
        )}
      />
    </Switch>
  );
};

AcquisitionUnits.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default AcquisitionUnits;
