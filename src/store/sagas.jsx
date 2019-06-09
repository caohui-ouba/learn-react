import { takeEvery, put } from 'redux-saga/effects';
import { GET_INIT_LIST } from './action-state'
import { afterAjaxDataAction } from './action-creator';
import axios from 'axios';
function* getInitList() {
  console.log('abc');
  try {
    const res = yield axios.get('/api/get/list');
    const action = afterAjaxDataAction(res.data);
    yield put(action);
  } catch (e) {
    console.log(e);
  }
}
function* mySaga() {
  yield takeEvery(GET_INIT_LIST, getInitList);
}
export default mySaga;