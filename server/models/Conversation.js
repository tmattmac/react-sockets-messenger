const sequelize = require('./db');

const Conversation = sequelize.define('Conversation');

module.exports = Conversation;