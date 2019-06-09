import { createStore } from 'redux'
import reducer from './reducer'

/**
 * 把笔记本传递给store
 */
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
