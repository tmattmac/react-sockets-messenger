const { Op, fn, col, where, literal } = require('sequelize');
const Conversation = require("../Conversation");
const Message = require('../Message');
  
async function sendMessage(fromUser, messageText, toUsers, conversationId) {
  
  // TODO: Wrap in a transaction
  let conversation;
  if (!conversationId) {
    conversation = await Conversation.create();
  }
  else {
    conversation = await Conversation.findByPk(conversationId);
  }

  // Force change to updatedAt
  await conversation.changed('updatedAt', true);

  await conversation.setUsers(toUsers, { through: { read: false } });
  await conversation.addUser(fromUser, { through: { read: true } });

  const message = Message.create({
    fromUser,
    conversationId: conversation.id,
    text: messageText
  });

  return message;
}

module.exports = { sendMessage };