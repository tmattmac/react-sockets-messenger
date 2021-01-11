const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const ConversationUser = sequelize.define('conversationUser', {
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = ConversationUser;