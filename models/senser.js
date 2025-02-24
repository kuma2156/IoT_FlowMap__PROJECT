// models/senser.js

const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); // 데이터베이스 연결 설정

class Senser extends Model {}

Senser.init({
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  humidity: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  sequelize,
  modelName: 'Senser',
  tableName: 'senser' // 테이블 이름을 senser로 지정
});

module.exports = Senser;
