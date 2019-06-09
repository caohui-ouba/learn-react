import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
//引入redux-thunk中间件
import thunk from 'redux-thunk';

//引入redux-saga
import createSagaMiddleware from 'redux-saga';
import todoSagas from './sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
// const enhancer = composeEnhancers(
//   applyMiddleware(thunk)
// );

//saga中间件
const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

/**
 * 把reducer和enhancer传递给store
 */
const store = createStore(
  reducer,
  enhancer
);
sagaMiddleware.run(todoSagas)

export default store;
