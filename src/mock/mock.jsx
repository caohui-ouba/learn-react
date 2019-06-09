import Mock from "mockjs";

const data = require('./data.json');

export default Mock.mock('/api/get/list', 'get', data);