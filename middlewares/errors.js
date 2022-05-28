const { SERVER_ERROR_TEXT } = require('../utils/constants');

module.exports.handleError = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? SERVER_ERROR_TEXT : message });

  next();
};
