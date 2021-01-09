const { searchUsers } = require('../models/queries/users');

const express = require("express");
const router = express.Router();

/**
 * GET /api/users?q={search term}
 * Get list of all users matching search term
 */
router.get("/", async (req, res, next) => {
  const { username } = res.locals;
  const { q = '' } = req.query;
  try {
    const users = await searchUsers(username, q);
    res.json({
      results: users.map(user => user.username)
    });
  } catch (err) {
    err.status = 400;
    next(err);
  }
});

module.exports = router;
