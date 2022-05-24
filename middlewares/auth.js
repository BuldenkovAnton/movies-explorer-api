const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const { USER_NEED_LOGIN_ERROR_TEXT } = require('../utils/constants');
const { UnauthorizedError } = require('../errors/unauthorized');

module.exports.auth = (req, res, next) => {
  const { jwtToken } = req.cookies;
  if (!jwtToken) {
    return next(new UnauthorizedError(USER_NEED_LOGIN_ERROR_TEXT));
  }

  let payload;

  try {
    payload = jwt.verify(jwtToken, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizedError(USER_NEED_LOGIN_ERROR_TEXT));
  }

  req.user = payload;
  return next();
};
