import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import HomePage from '../components/HomePage';
import NotFoundPage from '../components/NotFoundPage';

import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';


const history = createHistory();

class AppRouter extends React.Component {
  render() {
    return (
      <Router
        history={history}>
        <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route component={NotFoundPage}/>
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;

export { history };
