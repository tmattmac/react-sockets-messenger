const { Op, fn, col, where, literal } = require('sequelize');
const Conversation = require("../Conversation");
const Message = require('../Message');
const User = require("../User");
const { getConversationIdByUsers } = require('./conversations');
  
async function sendMessage(fromUser, toUsers, messageText) {
  
  let conversationId = await getConversationIdByUsers([fromUser, ...toUsers]);
  let conversation;

  // TODO: Look into transactions
  if (!conversationId) {
    conversation = await Conversation.create();
    conversation.setUsers([fromUser, ...toUsers]);
    conversationId = conversation.id;
  }

  // await conversation.setUsers(toUsers, { through: { read: false } });
  // await conversation.addUser(fromUser, { through: { read: true } });

  const message = Message.create({
    fromUser,
    conversationId,
    text: messageText
  });

  return message;
}

module.exports = { sendMessage };