import React, { Component, Fragment } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import "../style/style.css";
import '../mock/mock'
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      list: []
    };
  }

  componentDidMount = () => {
    //console.log("componentDidMount");

    axios.get('/api/get  Data').then((res) => {
      console.log(res.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  componentWillMount = () => {
    //console.log("componentWillMount")
  }

  shouldComponentUpdate = () => {
    //console.log("shouldComponentUpdate")
    return true;
  }
  componentWillUpdate = () => {
    //console.log("componentWillUpdate")
  }

  componentDidUpdate = () => {
    //console.log("componentDidUpdate")
  }

  // componentWillUnmount = () => {
  //   console.log("componentWillUnmount")
  // }

  // componentWillReceiveProps = () => {
  //   console.log("componentWillReceiveProps")
  // }

  render() {

    console.log("render...")

    return (
      // return的内容必须被一个标签包裹，或者Fragment
      <Fragment>
        <div>
          {
            //这个是在jsx的语句中写注释的方式
            //label的for标签要替换成htmlFor
          }
          <label htmlFor="insertArea">输入内容</label>
          <input
            id="insertArea"
            value={this.state.inputValue}
            onChange={this.handleInputChange.bind(this)}
            className="input"
            ref={(input) => { this.input = input }}
          />
          <button onClick={this.handleButtonClick.bind(this)}>提交</button>
        </div>
        <ul ref={(ul) => { this.ul = ul }}>{this.getTodoItem()}</ul>
      </Fragment>
    );
  }

  //输入框可以输入
  handleInputChange = (e) => {
    //target对应的是绑定的DOM节点
    //console.log(this);

    //不可以用以下方式修改组件的state
    //this.state.inputValue = e.target.value;

    //this.setState可以改变state的值
    const value = e.target.value;
    //console.log(this.input);

    // 这里可以用ref引用的input，但是不建议这么用
    //const value = this.input.value;
    this.setState(() => ({ inputValue: value }));
    // this.setState({
    //   inputValue: e.target.value
    // });
    //console.log(e.target.value);
  };

  handleButtonClick = () => {
    // 展开运算符...会把后面的list内容全部展开
    // this.setState(() => {
    //   return {
    //     list: [...this.state.list, this.state.inputValue],
    //     inputValue: ""
    //   };
    // });

    //preState  setState的一个入餐是preState，未修改之前的
    this.setState(preState => {
      return {
        list: [...preState.list, preState.inputValue],
        inputValue: ""
      };
    }, () => {
      // this.setState是一个异步操作，这里是一个执行完成后的回调
      //console.log(this.ul.querySelectorAll('li').length);
    });
    // this.setState({
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ""
    // });
  };

  handleItemDelete = index => {
    // react中有个概念叫immutable
    // state不允许（强烈不建议）我们做任何改变，只能拷贝之后再改
    this.setState(prevState => {
      const list = [...prevState.list];

      list.splice(index, 1);
      return { list };
    });
    //新版的react不建议以下做法
    // this.setState({
    //   list: list
    // });
  };

  getTodoItem = () => {
    return (
      // ES6提供了list的map操作
      this.state.list.map((item, index) => {
        // 在react中遍历list，每个元素都有一个key值,最好不要是index
        //这里的bind(this,index)可以往函数中传参数
        return (
          <Fragment key={index}>
            {/*父组件可以传个函数给子组件*/}
            <TodoItem
              content={item}
              index={index}
              handleItemDelete={this.handleItemDelete}
            />
          </Fragment>
        );
      })
    );
  };
}

export default TodoList;
