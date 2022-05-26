const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  USER_REGISTER_SUCCESS_TEXT,
  USER_REGISTER_ALREADY_CREATE_ERROR_TEXT,
  VALIDATION_ERROR_TEXT,
  USER_NOT_FOUND_ERROR_TEXT,
  USER_LOGOUT_SUCCESS_TEXT,
} = require('../utils/constants');

const { NotFoundError } = require('../errors/notFound');
const { ConflictError } = require('../errors/conflict');
const { ValidationError } = require('../errors/validationError');

const User = require('../models/user');

module.exports.logout = (req, res) => {
  res.cookie('jwtToken', '', { 'max-age': -1 }).send({ message: USER_LOGOUT_SUCCESS_TEXT });
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
      expiresIn: 3600,
    });
    return res
      .cookie('jwtToken', token, { maxAge: 3600000 * 24 * 7 })
      .send({ message: USER_REGISTER_SUCCESS_TEXT });
  } catch (err) {
    return next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      ...req.body,
      password: hash,
    });

    const sendUser = {
      name: user.name,
      email: user.email,
    };

    return res.send({ data: sendUser });
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictError(USER_REGISTER_ALREADY_CREATE_ERROR_TEXT));
    }

    if (err instanceof mongoose.Error.ValidationError) {
      return next(new ValidationError(VALIDATION_ERROR_TEXT));
    }

    return next(err);
  }
};

module.exports.getMyProfile = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      throw new ValidationError(VALIDATION_ERROR_TEXT);
    }

    const user = await User.findById(userId);
    if (!user) throw new NotFoundError(USER_NOT_FOUND_ERROR_TEXT);

    return res.send({ data: user });
  } catch (err) {
    return next(err);
  }
};

module.exports.updateMyProfile = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const userConflict = await User.findOne({ email: req.body.email });
    if (userConflict && userConflict._id.toString() !== userId) {
      throw new ConflictError(USER_REGISTER_ALREADY_CREATE_ERROR_TEXT);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
      },
      { runValidators: true, new: true },
    );

    if (!user) throw new NotFoundError(USER_NOT_FOUND_ERROR_TEXT);

    return res.send({ data: user });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new ValidationError(VALIDATION_ERROR_TEXT));
    }

    return next(err);
  }
};
