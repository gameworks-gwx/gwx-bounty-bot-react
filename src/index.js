import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import Routes from './Routes';

//!! Reducers
import authReducer from './store/reducers/auth';
import profileReducer from './store/reducers/profile';
import userReducer from './store/reducers/user';
import errorReducer from './store/reducers/error';
import dashboardReducer from './store/reducers/dashboard';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  user: userReducer,
  error: errorReducer,
  dashboard: dashboardReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const routes = (
  <Provider store={store}>
    <Routes />
  </Provider>
)

ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
