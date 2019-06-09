import { ADD_ITEM, DELETE_ITEM, CHANGE_INPUT_VALUE, AFTER_AJAX } from './action-state';
const defaultState = {
  inputValue: '',
  list: []
}
/**
 * reducer是一个笔记本，数据记载哪里
 * state 指的是上一次state的数据
 * action是store传递给reducer的行为对象
 */
export default (state = defaultState, action) => {
  console.log(state, action)
  //深拷贝state
  const newState = JSON.parse(JSON.stringify(state));
  if (action.type === CHANGE_INPUT_VALUE) {
    //不能直接改变state，需要拷贝一份改变
    newState.inputValue = action.value;
  } else if (action.type === ADD_ITEM) {
    newState.list = [...state.list, state.inputValue];
  } else if (action.type === DELETE_ITEM) {
    //删除
    newState.list.splice(action.value, 1)
  } else if (action.type === AFTER_AJAX) {
    console.log('after-ajax')
    newState.list = action.data;
  }
  return newState;
}