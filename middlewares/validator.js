const { Joi } = require('celebrate');

const isUrl = (value) => /^((https|http):\/\/)(www.)?([a-z0-9-.]*\.[a-z]*)(\/[a-zA-Z0-9#-_]+\/?)*$/mg.test(value);

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
  isUrl,
};
