const { Op, fn, col, where, literal } = require('sequelize');
const Conversation = require("../Conversation");
const Message = require('../Message');
const User = require("../User");
const { getConversationByUsers } = require('./conversations');
  
async function sendMessage(fromUser, toUsers, messageText) {
  
  let conversation = await getConversationByUsers([fromUser, ...toUsers]);

  // TODO: Look into transactions
  if (!conversation) {
    conversation = await Conversation.create();
  }

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