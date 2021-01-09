const { Op, fn, col, where, literal } = require('sequelize');
const Conversation = require("../Conversation");
const Message = require('../Message');
const User = require("../User");
const { getConversationIdByUsers } = require('./conversations');
  
async function sendMessage(fromUser, toUsers, messageText) {
  
  const conversationId = getConversationIdByUsers([fromUser, ...toUsers]);

  // TODO: Look into transactions
  if (!conversationId) {
    const users = await User.findAll({
      where: {
        username: {
          [Op.in]: [fromUser, ...toUsers]
        }
      }
    });
    const conversation = await Conversation.create();
    await conversation.setUsers(users);
    conversationId = conversation.id;
  }
  else {
    conversationId = conversation.id;
  }

  const message = Message.create({
    fromUser,
    conversationId,
    text: messageText
  });

  return message;
}

module.exports = { sendMessage };