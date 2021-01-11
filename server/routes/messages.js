const {
  getConversations,
  getConversationById,
  getConversationByUsers
} = require('../models/queries/conversations');
const { sendMessage } = require('../models/queries/messages');

const express = require("express");
const router = express.Router();

/**
 * GET /api/messages/all
 * Get a list of all conversations involving logged in user
 */
router.get("/all", async (req, res, next) => {
  const { username } = res.locals;
  try {
    const conversations = await getConversations(username);
    const conversationsFormatted = conversations.map(conversation => {
      return {
        ...conversation,
        users: conversation.users.map(user => user.username),
        readStatus: conversation.readStatus.read
      }
    });
    res.json({ conversations: conversationsFormatted });
  } catch (err) {
    err.status = 400;
    next(err);
  }
});

/**
 * GET /api/messages/withUsers
 * get the conversation ID of a conversation with specified users,
 * return 404 otherwise
 */
router.get("/withUsers", async (req, res, next) => {
  const { username } = res.locals;
  let { toUsers } = req.query;
  if (!Array.isArray(toUsers)) toUsers = [toUsers];
  console.log(toUsers);
  try {
    const conversation = await getConversationByUsers([username, ...toUsers]);
    if (!conversation) {
      const err = new Error('Not found');
      err.status = 404;
      return next(err);
    }
    res.json({ conversationId: conversation.id });
  } catch (err) {
    err.status = 400;
    next(err);
  }
});

/**
 * GET /api/messages/:conversationId
 */
router.get("/:conversationId", async (req, res, next) => {
  const { username } = res.locals;
  const conversationId = +req.params.conversationId;
  try {
    const conversation = await getConversationById(conversationId);
    // throw error if user isn't part of conversation
    if (!conversation.users.find(user => user.username === username)) {
      throw new Error('Unauthorized');
    }
    res.json({ messages: conversation.messages });
  } catch (err) {
    err.status = 400;
    next(err);
  }
});

// TODO: Remove after socket-io set up
router.post("/send", async (req, res, next) => {

  try {
    const { username: fromUser } = res.locals;
    const { toUsers, text, conversationId } = req.body;
    const message = await sendMessage(fromUser, toUsers, text, conversationId);
    res.json(message);
  } catch (err) {
    err.status = 400;
    next(err);
  }
});

module.exports = router;
