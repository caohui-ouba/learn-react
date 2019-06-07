# React学习笔记

成都市

## Temp 多少啊

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
