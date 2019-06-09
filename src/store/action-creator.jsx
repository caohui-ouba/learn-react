import { GET_INIT_LIST, DELETE_ITEM, CHANGE_INPUT_VALUE, ADD_ITEM, AFTER_AJAX } from './action-state';
import store from '../store/index'
import axios from 'axios'
export const deleteItemAction = (index) => ({
  type: DELETE_ITEM,
  index
});

export const changeInputAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
});

export const addItemAction = () => ({
  type: ADD_ITEM
});

export const afterAjaxDataAction = (data) => ({
  type: AFTER_AJAX,
  data
})

/**
 * redux-thunk让action可以是一个函数，这里就是返回一个函数
 */
export const getTodoList = () => {
  return () => {
    axios.get('/api/get/list').then((res) => {
      //console.log(res.data)
      const action = afterAjaxDataAction(res.data);
      store.dispatch(action);
    }).catch(e => (console.log(e)));
  }
}

/**
 * redux-saga
 */

export const getInitList = () => ({
  type: GET_INIT_LIST
});