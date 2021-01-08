const User = require('./User');
const Message = require('./Message');
const Conversation = require('./Conversation');
const ConversationUser = require('./ConversationUser');

User.hasMany(Message, {
  foreignKey: 'fromUser'
});
Message.belongsTo(User);

Conversation.hasMany(Message);
Message.belongsTo(Conversation);

User.belongsToMany(Conversation, { through: ConversationUser });
Conversation.belongsToMany(User, { through: ConversationUser });