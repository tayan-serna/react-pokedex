// @vendors
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducer from './reducers';

const loggerMiddleware = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = {};

const store = createStore(
  reducer,
  persistedState,
  composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(loggerMiddleware)
  ),
);

export default store;
