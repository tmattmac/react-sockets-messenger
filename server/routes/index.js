const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const messagesRouter = require("./conversations");
const usersRouter = require("./users");
const requireLogin = require("../middleware/requireLogin");

router.use("/auth", authRouter);
router.use("/conversations", requireLogin, messagesRouter);
router.use("/users", requireLogin, usersRouter);

module.exports = router;