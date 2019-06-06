import React, {Component} from "react";
class TodoItem extends Component {
  render() {
    const {content} = this.props;
    const {index} = this.props;
    return <li onClick={this.handleItemDelete.bind(this, index)}>{content}</li>;
  }

  handleItemDelete = index => {
    this.props.handleItemDelete(index);
  };
}
export default TodoItem;
