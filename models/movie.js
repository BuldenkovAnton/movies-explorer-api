const mongoose = require('mongoose');
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
      message: (props) => `${props.value} is not a valid url`,
    },
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (v) => isUrl(v),
      message: (props) => `${props.value} is not a valid url`,
    },
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (v) => isUrl(v),
      message: (props) => `${props.value} is not a valid url`,
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
