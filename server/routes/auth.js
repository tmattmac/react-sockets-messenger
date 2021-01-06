const User = require('../models/User');

const Validator = require('validatorjs');
const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();


router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.authenticate(username, password);
    const token = jwt.sign(
      { username: user.username },
      process.env.SECRET_KEY
    );
    res.cookie('token', token).send({ message: "Successfully logged in." });
  } catch (err) {
    err.status = 401;
    next(err);
  }
});

router.post("/register", async (req, res, next) => {

  // validate incoming data
  const rules = {
    username: 'alpha_dash|min:3|required',
    password: 'min:6|required',
    email: 'email|required'
  };
  const validation = new Validator(req.body, rules);
  if (validation.fails()) {
    const err = {};
    err.message = validation.errors.all();
    err.status = 400;
    return next(err);
  }

  try {
    const { username, password, email } = req.body;
    const user = await User.create({ username, password, email });
    const token = jwt.sign(
      { username: user.username },
      process.env.SECRET_KEY
    );
    res
      .cookie('token', token)
      .status(201)
      .send({ message: "New account successfully created." });
  } catch (err) {
    err.status = 400;
    next(err);
  }
})

module.exports = router;
