const { Joi } = require('celebrate');

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const signupSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateMyProfileSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
});

module.exports = {
  signinSchema,
  signupSchema,
  updateMyProfileSchema,
};
