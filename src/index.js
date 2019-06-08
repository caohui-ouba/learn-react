import React from "react";
import ReactDOM from "react-dom";
import TodoList from "./components/TodoList";
import App from './App'
import TestAntd from "./components/TestAntd";
//PWA proggressive web application
//断网可以访问网页，已存储
//https协议的服务器上
//import * as serviceWorker from "./serviceWorker";

// 这个文件是整个程序的入口文件

//挂在节点，吧<App />挂载到id = root节点上
// JSX语法，下面这种<App />就是JSX语法
ReactDOM.render(<TestAntd />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
