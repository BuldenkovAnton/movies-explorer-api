const mongoose = require('mongoose');
const { ForbiddenError } = require('../errors/forbidden');
const { NotFoundError } = require('../errors/notFound');
const { ValidationError } = require('../errors/validationError');

const Movie = require('../models/movie');

module.exports.createMySaveMovies = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const movie = await Movie.create({ ...req.body, owner });
    await movie.populate('owner');

    return res.send({ data: movie });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new ValidationError('Переданы некорректные данные при создании фильма'));
    }

    return next(err);
  }
};

module.exports.deleteMySaveMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) throw new NotFoundError('Фильм не найден');

    await movie.populate('owner', '_id');

    if (movie.owner._id.toString() !== req.user._id) {
      throw new ForbiddenError('Вы не можете удалить чужую карточку');
    }

    await Movie.findByIdAndDelete(req.params.movieId);

    return res.send({ data: movie });
  } catch (err) {
    return next(err);
  }
};
