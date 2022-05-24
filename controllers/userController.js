const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { ConflictError } = require('../errors/conflict');
const { ValidationError } = require('../errors/validationError');

const User = require('../models/users');

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
      return next(new ConflictError('Пользователь с таким email уже существует'));
    }

    if (err instanceof mongoose.Error.ValidationError) {
      return next(new ValidationError('Переданы некорректные данные при создании пользователя'));
    }

    return next(err);
  }
};
