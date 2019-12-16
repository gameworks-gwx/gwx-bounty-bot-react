import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { PrivateRoute } from './components/Routes/PrivateRoute';
import { AuthRoute } from './components/Routes/AuthRoute';
import AppRoutes from './App';
import AuthRoutes from './Auth'

import 'antd/dist/antd.css';
import './assets/css/styles.css';

const Routes = ({ history }) => {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <AuthRoute path="/login" component={AuthRoutes} />
        <PrivateRoute path="/" component={AppRoutes} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;