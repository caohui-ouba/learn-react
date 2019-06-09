import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
//引入redux-thunk中间件
import thunk from 'redux-thunk';

/**
 * 把笔记本传递给store
 */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);
const store = createStore(
  reducer,
  enhancer
);

export default store;
