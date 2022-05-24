const router = require('express').Router();
const { celebrate } = require('celebrate');

const { auth } = require('../middlewares/auth');
const { signinSchema, signupSchema } = require('../middlewares/validator');
const { NotFoundError } = require('../errors/notFound');

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { login, createUser, logout } = require('../controllers/userController');

router.post('/signin', celebrate({ body: signinSchema }), login);
router.post('/signup', celebrate({ body: signupSchema }), createUser);
router.post('/signout', auth, logout);

router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);
router.use('*', auth, (req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
