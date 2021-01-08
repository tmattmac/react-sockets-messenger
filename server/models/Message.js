const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Message = sequelize.define('Message', {
  text: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Message;