const { Op, fn, col } = require('sequelize');
const Conversation = require("../Conversation");
const Message = require("../Message");
const User = require("../User");

async function getConversations(username) {
  const user = await User.findByPk(username, {
    include: [{
      model: Conversation,
      attributes: ['id'],
      order: [[fn('max', col('$messages.createdAt$')), 'ASC']],
      group: ['id'],
      through: { attributes: ['read'], as: 'readStatus' },
      include: [{
        model: User,
        where: {
          [Op.not]: { username }
        },
        through: { attributes: [] }
      },
      {
        model: Message.scope('last'),
        separate: true
      }]
      
    }]
  });
  return user.conversations;
}

async function getConversationById(conversationId) {
  const conversation = await Conversation.findByPk(conversationId, {
    include: [{
      model: Message.scope('ordered')
    }, {
        model: User,
        through: { attributes: [] }
    }]
  });

  return conversation;
}

// TODO: Find a more efficient way to do this
async function getConversationIdByUsers(usernames) {
  let conversation = await ConversationUser.findOne({
    attributes: [['conversationId', 'id']],
    having: where(fn('array_agg', literal('"conversationUser"."username"::text')), {
      [Op.contains]: usernames,
      [Op.contained]: usernames
    }),
    group: ['id']   
  });
  if (conversation) {
    return conversation.id;
  }
  return null;
}

module.exports = {
  getConversations,
  getConversationById,
  getConversationIdByUsers
};