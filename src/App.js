import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from './components/UI/Navbar';

//!! Containers (pages)
import Dashboard from './containers/Dashboard';
import Profiles from './containers/Profiles';
import Admin from './containers/Admin';
import Logout from './containers/Logout';

import 'semantic-ui-css/semantic.min.css';

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/admin" component={Admin} />
      </Switch>
    </>
  );
}

export default App;
