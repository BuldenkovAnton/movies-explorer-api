const router = require('express').Router();
const { celebrate } = require('celebrate');

const { createMySaveMovieSchema, deleteMySaveMovieSchema } = require('../middlewares/validator');
const { createMySaveMovies, deleteMySaveMovieById } = require('../controllers/movieController');

router.post('/', celebrate({ body: createMySaveMovieSchema }), createMySaveMovies);
router.delete('/:movieId', celebrate({ params: deleteMySaveMovieSchema }), deleteMySaveMovieById);

module.exports = router;
