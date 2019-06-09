import React, { Component } from 'react'
import store from '../store/index'
import { addItemAction, deleteItemAction, changeInputAction } from '../store/action-creator'
import TodoListUI from '../ui/TodoListUI'
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
}
