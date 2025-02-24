// models/population.js

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection');

class Population extends Model {}

Population.init({
  // 여기에 Population 모델의 필드들을 정의합니다.
  gugun: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rateYear: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dongCnt: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  houseCnt: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totPopCnt: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mPopCnt: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fPopCnt: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  popRatio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  popDensity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Population',
  tableName: 'populations', // 데이터베이스 테이블 이름
  timestamps: false // createdAt, updatedAt 필드를 사용하지 않음
});

module.exports = Population;
