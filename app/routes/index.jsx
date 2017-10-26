import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, browserHistory, Route } from 'react-router-dom';

import '../src/styles/app';

import configureStore from '../src/redux/stores/configure_store';
import preloadedState from '../src/redux/stores/preloaded_state';
import routes from './routes.jsx';
import Helper from '../src/utils/helper';

let store;
if (Helper.isLoggedIn()) {
  const allRepos = preloadedState.getAllRepos();
  const debugOption = preloadedState.setDebugOption();
  store = configureStore({ allRepos, debugOption });
} else {
  store = configureStore({});
}

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>
), document.getElementById('root'));
