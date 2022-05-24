const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { celebrate, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { auth } = require('./middlewares/auth');
const { handleError } = require('./middlewares/errors');
const { NotFoundError } = require('./errors/notFound');
const { signinSchema, signupSchema } = require('./middlewares/validator');

const { login, createUser, logout } = require('./controllers/userController');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

const app = express();
const { PORT = 3000 } = process.env;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(requestLogger);

app.post('/signin', celebrate({ body: signinSchema }), login);
app.post('/signup', celebrate({ body: signupSchema }), createUser);
app.post('/signout', auth, logout);

app.use('*', auth, (req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT);
