const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');

const { EMAIL_NOT_VALID_ERROR_TEXT, USER_CREDENTIALS_NOT_CORRECT_ERROR_TEXT } = require('../utils/constants');
const { UnauthorizedError } = require('../errors/unauthorized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: EMAIL_NOT_VALID_ERROR_TEXT,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');

  if (!user) {
    throw new UnauthorizedError(USER_CREDENTIALS_NOT_CORRECT_ERROR_TEXT);
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new UnauthorizedError(USER_CREDENTIALS_NOT_CORRECT_ERROR_TEXT);
  }

  return user;
};

module.exports = mongoose.model('user', userSchema);
