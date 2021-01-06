const jwt = require('jsonwebtoken');

const requireLogin = (req, res, next) => {
  try {
    const { username } = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
    res.locals.username = username;
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
}

export default requireLogin;