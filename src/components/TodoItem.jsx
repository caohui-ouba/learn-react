import React, { Component } from "react";
//PropTypes是对父组件传来的参数做类型校验
import PropTypes from "prop-types";
class TodoItem extends Component {
  render() {
    console.log("child render");
    const { content, test } = this.props;
    const { index } = this.props;
    return (
      <li onClick={this.handleItemDelete.bind(this, index)}>
        {test} - {content}
      </li>
    );
  }
  componentWillReceiveProps = () => {
    //console.log("child componentWillReceiveProps")
  }


  componentWillUnmount = () => {
    //console.log("child componentWillUnmount")
  }

  /**
    * nextProps 将要发生的变化
    * nextState 将要发生的变化
    */
  shouldComponentUpdate = (nextProps, nextState) => {
    //这样做，当父组件更新后，子组件可以选择性的更新，而不是每次都更新
    return nextProps.content !== this.props.content;
  }
  handleItemDelete = index => {
    const { handleItemDelete } = this.props;
    handleItemDelete(index);
  };
}

//做强校验
TodoItem.propTypes = {
  content: PropTypes.string,
  index: PropTypes.number,
  handleItemDelete: PropTypes.func,
  test: PropTypes.string.isRequired
};

// 如果父组件没有传这个值，那么它有个默认值
TodoItem.defaultProps = {
  test: "hello"
};
export default TodoItem;
