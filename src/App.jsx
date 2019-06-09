import React, { Component, Fragment } from "react";
import { CSSTransition } from 'react-transition-group';
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
        <CSSTransition
          in={this.state.show}
          timeout={1000}
          classNames='fade'
          onEntered={(el) => { el.style.color = 'blue' }}
          appear={true}
        >
          <div>hello world</div>
        </CSSTransition>
        <button onClick={this.toggle}>toggle</button>

        <br></br>

      </Fragment >
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
