import React, { Component } from 'react'
import store from '../store/index'
import { getInitList, getTodoList, addItemAction, deleteItemAction, changeInputAction, afterAjaxDataAction } from '../store/action-creator'
import TodoListUI from '../ui/TodoListUI'
import axios from 'axios'
export default class TodoList extends Component {

  constructor(props) {
    super(props)
    //getState方法可以拿出reducer中的state
    //console.log(store.getState())
    this.state = store.getState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.hangStoreChange = this.handleStoreChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    store.subscribe(this.handleStoreChange);
  }

  componentDidMount = () => {
    // axios.get('/api/get/list').then((res) => {
    //   console.log(res.data)
    //   this.handleAfterAjax(res.data);
    // }).catch(e => (console.log(e)));

    /**
     * 这里用redux-thunk中间件，统一管理异步操作
     */

    // const action = getTodoList();
    // store.dispatch(action);

    /**
     * 利用saga中间价
     */
    const action = getInitList();
    store.dispatch(action);

  }
  render() {
    return (
      <TodoListUI
        inputValue={this.state.inputValue}
        list={this.state.list}
        handleInputChange={this.handleInputChange}
        handleBtnClick={this.handleBtnClick}
        handleItemClick={this.handleItemClick}
      />
    )
  }

  handleInputChange = (e) => {
    /**
     * 创建一个action
     */
    const action = changeInputAction(e.target.value)
    /**
     * 传递给reducer
     */
    store.dispatch(action)
  }

  handleStoreChange = () => {
    console.log("handleStoreChange")
    this.setState(() => (store.getState()));
  }

  handleBtnClick = () => {
    const action = addItemAction();
    store.dispatch(action)
  }

  handleItemClick = (index) => {
    console.log(index)
    const action = deleteItemAction(index)
    store.dispatch(action)
  }

  handleAfterAjax = (data) => {
    const action = afterAjaxDataAction(data);
    store.dispatch(action);
  }
}
