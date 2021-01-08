const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const ConversationUser = sequelize.define('ConversationUser', {
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = ConversationUser;