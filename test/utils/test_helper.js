import jquery from 'jquery';
import TestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import chaiJquery from 'chai-jquery';
import { MemoryRouter } from 'react-router-dom';

import './test_globals';

import preloadedState from '../../app/src/redux/stores/preloaded_state';
import configureStore from '../../app/src/redux/stores/configure_store';

const $ = jquery(global.window);
const allRepos = preloadedState.getAllRepos();
const debugOption = preloadedState.setDebugOption();
const store = configureStore({ allRepos, debugOption });

// build 'renderComponent' helper that should render a given react class
function renderComponent(ComponentClass, props) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={store}>
      <MemoryRouter>
        <ComponentClass {...props} />
      </MemoryRouter>
    </Provider>,
  );

  return $(findDOMNode(componentInstance));
}

function findRenderedComponentWithType(componentInstance, componentClass) {
  return TestUtils.findRenderedComponentWithType(
    componentInstance, componentClass,
  );
}

function check(done, f) {
  try {
    f();
    return done();
  } catch (e) {
    return done(e);
  }
}

// Build helper for simulating events
$.fn.simulate = function simulate(eventName, value) {
  if (value) {
    this.val(value);
  }

  TestUtils.Simulate[eventName](this[0]);
};

// Set up chai-jquery
chaiJquery(chai, chai.util, $);

export {
  store,
  renderComponent,
  findRenderedComponentWithType,
  expect,
  check,
};
