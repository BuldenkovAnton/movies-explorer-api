const router = require('express').Router();

const { createMySaveMovieSchema, deleteMySaveMovieSchema } = require('../middlewares/validator');
const { getMySaveMovies, createMySaveMovies, deleteMySaveMovieById } = require('../controllers/movieController');

router.get('/', getMySaveMovies);
router.post('/', createMySaveMovieSchema, createMySaveMovies);
router.delete('/:id', deleteMySaveMovieSchema, deleteMySaveMovieById);

module.exports = router;
