const router = require('express').Router();
const { celebrate } = require('celebrate');

const { createMySaveMovieSchema, deleteMySaveMovieSchema } = require('../middlewares/validator');
const { getMySaveMovies, createMySaveMovies, deleteMySaveMovieById } = require('../controllers/movieController');

router.get('/', getMySaveMovies);
router.post('/', celebrate({ body: createMySaveMovieSchema }), createMySaveMovies);
router.delete('/:movieId', celebrate({ params: deleteMySaveMovieSchema }), deleteMySaveMovieById);

module.exports = router;
