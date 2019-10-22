import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from './components/UI/Navbar';

//!! Containers (pages)
import Dashboard from './containers/Dashboard';

import 'semantic-ui-css/semantic.min.css';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
    </Switch>
  );
}

export default App;
