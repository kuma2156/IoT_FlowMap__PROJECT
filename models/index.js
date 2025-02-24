const express = require('express');
const axios = require('axios');
const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Comment = Comment;

User.initiate(sequelize);
Comment.initiate(sequelize);

User.associate(db);
Comment.associate(db);

const app = express();
const port = 3000;

const apiKey = 'b8%2FsKyBqQqXRxPUYh4mRc3cpyNdLb5T%2Bv9QZG0GUY9WooJf9wirSWek5Q5UIJAkS5Aoq9DPGvrH5%2Bb%2BsiQKHPQ%3D%3D';  // 여기에 발급받은 API 키를 입력하세요.

app.get('/api/population', async (req, res) => {
  try {
    const response = await axios.get('http://apis.data.go.kr/6260000/BusanPopulationStaticService', {
      params: {
        serviceKey: apiKey,
        pageNo: 1,
        numOfRows: 10,
        resultType: 'json'
      }
    });
    const data = response.data;
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('서버 오류가 발생했습니다.');
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Node.js Server</h1><p>Visit <a href="/api/population">Population Data</a> to see the public data.</p>');
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

module.exports = db;
