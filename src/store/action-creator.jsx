import { DELETE_ITEM, CHANGE_INPUT_VALUE, ADD_ITEM } from './action-state';


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