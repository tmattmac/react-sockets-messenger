const { Sequelize } = require('sequelize');

const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_URI = 'localhost'
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_URI,
  dialect: 'postgres'
});


module.exports = sequelize;