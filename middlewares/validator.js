const { Joi } = require('celebrate');

const isUrl = (value) => /^((https|http):\/\/)(www.)?([a-z0-9-.]*\.[a-z]*)(\/[a-zA-Z0-9#-_]+\/?)*$/mg.test(value);

const isUrlMethod = (value, helpers) => {
  if (!isUrl(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

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

const createMySaveMovieSchema = Joi.object({
  country: Joi.string().required(),
  director: Joi.string().required(),
  duration: Joi.number().required(),
  year: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().custom(isUrlMethod, 'url not valid'),
  trailerLink: Joi.string().custom(isUrlMethod, 'url not valid'),
  thumbnail: Joi.string().custom(isUrlMethod, 'url not valid'),
  movieId: Joi.string().length(24).hex().required(),
  nameRU: Joi.string().required(),
  nameEN: Joi.string().required(),
});

const deleteMySaveMovieSchema = Joi.object({
  movieId: Joi.string().length(24).hex().required(),
});

module.exports = {
  signinSchema,
  signupSchema,
  updateMyProfileSchema,
  createMySaveMovieSchema,
  deleteMySaveMovieSchema,
  isUrl,
  isUrlMethod,
};
