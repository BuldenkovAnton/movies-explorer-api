const mongoose = require('mongoose');

const {
  VALIDATION_ERROR_TEXT,
  MOVIE_NOT_FOUND_ERROR_TEXT,
  MOVIE_NOT_DELETE_NOT_OWNER_MOVIE_ERROR_TEXT,
} = require('../utils/constants');

const { ForbiddenError } = require('../errors/forbidden');
const { NotFoundError } = require('../errors/notFound');
const { ValidationError } = require('../errors/validationError');

const Movie = require('../models/movie');

module.exports.getMySaveMovies = (req, res, next) => {
  const { _id: owner } = req.user;

  Movie.find({ owner })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.createMySaveMovies = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const movie = await Movie.create({ ...req.body, owner });

    return res.send({ data: movie });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new ValidationError(VALIDATION_ERROR_TEXT));
    }

    return next(err);
  }
};

module.exports.deleteMySaveMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) throw new NotFoundError(MOVIE_NOT_FOUND_ERROR_TEXT);

    if (movie.owner.toString() !== req.user._id) {
      throw new ForbiddenError(MOVIE_NOT_DELETE_NOT_OWNER_MOVIE_ERROR_TEXT);
    }

    await Movie.findByIdAndDelete(req.params.id);

    return res.send({ data: movie });
  } catch (err) {
    return next(err);
  }
};
