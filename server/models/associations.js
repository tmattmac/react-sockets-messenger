const User = require('./User');
const Message = require('./Message');
const Conversation = require('./Conversation');
const ConversationUser = require('./ConversationUser');

User.hasMany(Message, {
  foreignKey: 'fromUser'
});
Message.belongsTo(User, {
  foreignKey: 'fromUser'
});

Conversation.hasMany(Message, {
  foreignKey: 'conversationId'
});
Message.belongsTo(Conversation);

User.belongsToMany(Conversation, {
  foreignKey: 'username',
  through: { model: ConversationUser, as: 'readStatus' }
});
Conversation.belongsToMany(User,
  { through: { model: ConversationUser, as: 'readStatus' } }
);