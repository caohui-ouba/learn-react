import React, { Component } from "react";
//PropTypes是对父组件传来的参数做类型校验
import PropTypes from "prop-types";
class TodoItem extends Component {
  render() {
    const { content, test } = this.props;
    const { index } = this.props;
    return (
      <li onClick={this.handleItemDelete.bind(this, index)}>
        {test} - {content}
      </li>
    );
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
