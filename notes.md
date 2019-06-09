# React学习笔记

开启React

## 组件化编程

### 组件化 Component

页面上每个部分都可以是一个组件

### class的export

### state的概念

当state或者props发生改变的时候，render重新执行

当父组件的render重新执行的时候，它的子组件的render也会重新执行

### 响应式事件绑定

### 组件传值

### 单向数据流

### PropTypes验证类型

### React的虚拟DOM

#### 如果没有虚拟DOM，自己实现：

- 有state
- JSX 模版
- 数据 + 模版结合，生成真实的DOM
- state 发生改变 -> 第三步 -> 生成新的DOM替换原来的DOM

缺陷 ：

- 改变一次state生成一个完整DOM树，效率很低

#### 第二种做法

- 有state
- JSX 模版
- 数据 + 模版结合，生成真实的DOM
- state 发生改变 -> 第三步 -> 生成新的DOM和原始DOM做比对，替换变化的部分，效率提高了

缺陷：有比对这一步，效率还是低

#### 虚拟DOM的做法

- 有state
- JSX 模版
- 数据 + 模版结合，生成真实的DOM
- 生成虚拟DOM(虚拟DOM就是一个JS对象)

真实DOM：

```html
<div id = 'abc'>
  <span>hello world</span>
</div>
```

虚拟DOM ：

[ 'div', {id:'abc'}, [ 'span', {}, 'hello world' ] ]

- state 发生改变 -> 生成新的虚拟DOM -> 对比旧的虚拟DOM，找到区别 ->部分替换真实DOM中的内容

优点：减少对真实DOM的操作，效率大幅度提升。

#### diff算法

比较原始的虚拟DOM和新的虚拟DOM之间的区别

- 多次setState会被合并成一次setState，减少渲染次数
- 同级比较，父层不同，则父层的节点及其子层全部替换

#### react中Ref的使用

ref可以通过lambda函数获取页面上的DOM节点

#### react的生命周期函数

生命周期函数指的是在某一个时刻组件会自动执行的函数。

- render是一个生命周期函数
- componentWillMount 组件将要挂载到页面上的时候会被执行
- componentDidMount 组件挂在之后执行 ，通常在这个方法里写Ajax请求，这个函数只在组件挂载在节点之后执行一次
- shouldComponentUpdate 当数据（State，Props）被改变的时候，执行
- componentWillUpdate 组件将要被更新，只有shouldComponentUpdate返回true的时候才执行。
- componentDidUpdate 组件更新结束之后会被执行
- componentWillReceiveProps 当一个组件要从父组件接收参数，执行时间是父组件的render被重新执行了之后，子组件的componentWillReceiveProps会执行

#### React发送Ajax请求

Axios库发送ajax请求， yarn add axios

#### MockJs 进行数据接口的模拟

#### React使用CSS3实现动画

#### React使用react-transition-group实现动画

#### Redux数据层框架

redux = reducer + flux

解决子组件向多个父组件传值的问题

工作流程：

- React Component 需求数据者 。
- Action Creators 数据请求，dispatch(action)
- Store 数据仓库 。
- Reducers 数据仓库管理员。

##### 先编写Reducer，写回调函数

其实就是吧新的store中的state返回给store

```js
const defaultState = {
  inputValue: '',
  list: []
}
export default (state = defaultState, action) => {
  return state;
}
```

##### 再编写Store

```js
import { createStore } from 'redux'
import reducer from './reducer'
/**
 * 把Reducer传递给store
 */
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
```

import 将reducer引进，在初始化store的时候，要吧reducer放进去

##### 在组件中先订阅store的改变

```js
store.subscribe(this.handleStoreChange);
```

##### ActionTypes拆分

把所有的action的type的值，放到一个文件中，方便管理和维护

新建一个文件 action-state.jsx

```js
export const CHANGE_INPUT_VALUE = 'change_input_value';
export const ADD_ITEM = 'add_item'
export const DELETE_ITEM = 'delete_item'
```

##### ActionCreator创建action

创建一个工厂类action-creator

```js
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
```

在组件想要获得action的时候，可以用actionCreator的方法获取，有利于维护

### React拆分UI组件和容器组件

UI组件：傻瓜组件，只有标签渲染
容器组件：聪明组件，控制逻辑

TodoList抽离出来UI组件

```jsx
import React, { Component, Fragment } from 'react'
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd';

export default class TodoListUI extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <Input
            placeholder="todo info"
            style={{ width: '300px', marginRight: '10px' }}
            value={this.props.inputValue}
            onChange={this.props.handleInputChange}
          />
          <Button
            type="primary"
            onClick={this.props.handleBtnClick}
          >提交</Button>
        </div>
        <List
          bordered
          dataSource={this.props.list}
          renderItem={(item, index) => (<List.Item onClick={() => { this.props.handleItemClick(index) }}>{item}</List.Item>)}
          style={{ width: '300px', marginRight: '10px' }}
        >
        </List>
      </Fragment>
    )
  }
}
```

原来的组件：

```jsx
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
```

这样做让UI和控制逻辑分离，符合单一原则

### 无状态组件

不需要state，只要有props就可以，比如上面的TodoListUI可以改成

```js
import React, { Component, Fragment } from 'react'
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd';
// 无状态组件
const TodoListUI = (props) => {
  return (
    <Fragment>
      <div>
        <Input
          placeholder="todo info"
          style={{ width: '300px', marginRight: '10px' }}
          va lue={this.props.inputValue}
          onChange={this.props.handleInputChange}
        />
        <Button
          type="primary"
          onClick={this.props.handleBtnClick}
        >提交</Button>
      </div>
      <List
        bordered
        dataSource={this.props.list}
        renderItem={(item, index) => (<List.Item onClick={() => { this.props.handleItemClick(index) }}>{item}</List.Item>)}
        style={{ width: '300px', marginRight: '10px' }}
      >
      </List>
    </Fragment>
  )
}
export default TodoListUI;
```

### redux中的中间件- Redux-thunk

redux-thunk中间价可以让action是一个函数，而不是一个对象，这样。并且在dispatch这个action的时候，会自动的执行这个函数。

因此我们可以吧组件中的异步操作，比如Ajax获取数据之类的，放到action中去处理。

首先引入redux-thunk中间件，在初始化store的地方

```jsx
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
```

然后就可以愉快的使用了，我们先写一个action creator，返回一个类型为函数的action。

```jsx
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
```

然后在组件中调用这个creator

```jsx
componentDidMount = () => {
    const action = getTodoList();
    store.dispatch(action);
}
```

componentDidMount中原本写的是调用ajax的异步操作，现在都放到action中了。在大型项目中便于维护。

### redux-saga中间件的使用

redux-saga中间件也是一种异步请求的管理工具

首先引入redux-saga

```jsx
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
//引入redux-saga
import createSagaMiddleware from 'redux-saga';
import todoSagas from './sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

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
```

自己新建sages.jsx, generator函数

```jsx
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

/**
 * mySaga函数的takeEvery订阅了GET_INIT_LIST，每次store.dispatch的是GET_INIT_LIST类型的action，执行这里的getINitList函数。
 */
function* mySaga() {
  yield takeEvery(GET_INIT_LIST, getInitList);
}
export default mySaga;
```


