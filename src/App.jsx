import React, { Component, Fragment } from "react";
import './style/app.css';
class App extends Component {

  constructor(args) {
    super(args);
    this.toggle = this.toggle.bind(this);
    this.state = {
      show: true
    }
  }
  render() {
    //JSX语法,组件开头必须是大写字母
    return (
      <Fragment>
        <div className={this.state.show ? "show" : "hidden"}>hello world</div>
        <button onClick={this.toggle}>toggle</button>
      </Fragment>
    );
  }

  toggle = () => {
    this.setState((preState) => ({ show: !preState.show }));
  }

  componentDidUpdate = () => {
    console.log(this.state.show)
  }
}
export default App;
