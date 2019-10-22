import React from 'react';
import Login from './containers/Login';
import { Switch, Route } from 'react-router-dom';

const Auth = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
    </Switch>
  )
}

export default Auth;