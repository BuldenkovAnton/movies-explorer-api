const mongoose = require('mongoose');
const { URL_NOT_VALID } = require('../utils/constants');
const { isUrl } = require('../middlewares/validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (v) => isUrl(v),
      message: (props) => `${props.value} ${URL_NOT_VALID}`,
    },
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (v) => isUrl(v),
      message: (props) => `${props.value} ${URL_NOT_VALID}`,
    },
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (v) => isUrl(v),
      message: (props) => `${props.value} ${URL_NOT_VALID}`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
