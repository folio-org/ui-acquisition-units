import React, { Fragment } from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import ReactRouterPropTypes from 'react-router-prop-types';

import AcquisitionUnitsList from './AcquisitionUnitsList';
import AcquisitionUnitDetails from './AcquisitionUnitDetails';

const AcquisitionUnits = ({ match, history }) => {
  const { path } = match;

  const getViewpath = acquisitionUnitId => `${path}/${acquisitionUnitId}/view`;

  const closePane = () => history.push(path);

  return (
    <Switch>
      <Route
        path={path}
        render={() => (
          <Fragment>
            <AcquisitionUnitsList getViewPath={getViewpath} />
            <Route
              exact
              path={getViewpath(':id')}
              render={(props) => (
                <AcquisitionUnitDetails
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
