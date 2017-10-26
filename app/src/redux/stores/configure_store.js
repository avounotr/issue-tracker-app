import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers/index.js';

export default function (preloadedState) {
  const middleware = preloadedState.debugOption ?
    applyMiddleware(thunkMiddleware, promiseMiddleware, createLogger()) :
    applyMiddleware(thunkMiddleware, promiseMiddleware);

  return createStore(
    rootReducer,
    preloadedState,
    middleware,
  );
}
