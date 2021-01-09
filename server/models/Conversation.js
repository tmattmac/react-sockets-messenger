const sequelize = require('./db');

const Conversation = sequelize.define('conversation');

module.exports = Conversation;