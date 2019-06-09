import React, { Fragment } from 'react'
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
          value={props.inputValue}
          onChange={props.handleInputChange}
        />
        <Button
          type="primary"
          onClick={props.handleBtnClick}
        >提交</Button>
      </div>
      <List
        bordered
        dataSource={props.list}
        renderItem={(item, index) => (<List.Item onClick={() => { props.handleItemClick(index) }}>{item}</List.Item>)}
        style={{ width: '300px', marginRight: '10px' }}
      >
      </List>
    </Fragment>
  )
}
export default TodoListUI;
// export default class TodoListUI extends Component {
//   render() {
//     return (
//       <Fragment>
//         <div>
//           <Input
//             placeholder="todo info"
//             style={{ width: '300px', marginRight: '10px' }}
//             va lue={this.props.inputValue}
//             onChange={this.props.handleInputChange}
//           />
//           <Button
//             type="primary"
//             onClick={this.props.handleBtnClick}
//           >提交</Button>
//         </div>
//         <List
//           bordered
//           dataSource={this.props.list}
//           renderItem={(item, index) => (<List.Item onClick={() => { this.props.handleItemClick(index) }}>{item}</List.Item>)}
//           style={{ width: '300px', marginRight: '10px' }}
//         >
//         </List>
//       </Fragment>
//     )
//   }
// }
