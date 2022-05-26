const router = require('express').Router();

const { auth } = require('../middlewares/auth');
const { signinSchema, signupSchema } = require('../middlewares/validator');
const { PAGE_NOT_FOUND_ERROR_TEXT } = require('../utils/constants');
const { NotFoundError } = require('../errors/notFound');

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { login, createUser, logout } = require('../controllers/userController');

router.post('/signin', signinSchema, login);
router.post('/signup', signupSchema, createUser);
router.post('/signout', auth, logout);

router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);
router.use('*', auth, (req, res, next) => next(new NotFoundError(PAGE_NOT_FOUND_ERROR_TEXT)));

module.exports = router;
