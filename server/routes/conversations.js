const { getConversations, getConversationById } = require('../models/queries/conversations');

const express = require("express");
const router = express.Router();

/**
 * GET /api/conversations
 * Get a list of all conversations involving logged in user
 */
router.get("/", async (req, res, next) => {
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
 * GET /api/conversations/:conversationId
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

module.exports = router;
