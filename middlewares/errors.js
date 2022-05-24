const { SERVER_ERROR_TEXT } = require('../utils/constants');

module.exports.handleError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({ message: message === 500 ? SERVER_ERROR_TEXT : message });

  next();
};
