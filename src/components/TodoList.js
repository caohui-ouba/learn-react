import React, {Component, Fragment} from "react";
import TodoItem from "../components/TodoItem";
import "../style/style.css";
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      list: []
    };
  }
  render() {
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
            onChange={this.handleInputChange}
            className="input"
          />
          <button onClick={this.handleButtonClick}>提交</button>
        </div>
        <ul>{this.getTodoItem()}</ul>
      </Fragment>
    );
  }

  //输入框可以输入
  handleInputChange = e => {
    //target对应的是绑定的DOM节点
    //console.log(this);

    //不可以用以下方式修改组件的state
    //this.state.inputValue = e.target.value;

    //this.setState可以改变state的值
    const value = e.target.value;
    this.setState(() => ({inputValue: value}));
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
      return {list};
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
