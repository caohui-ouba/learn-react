import Mock from "mockjs";

const data = require('./data.json');
export default Mock.mock('/api/getData', 'get', {
    success: true,
    message: '成功',
    list: data
})