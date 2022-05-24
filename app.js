const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { celebrate, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleError } = require('./middlewares/errors');
const { signinSchema, signupSchema } = require('./middlewares/validator');

const { login, createUser } = require('./controllers/userController');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(requestLogger);

app.post('/signin', celebrate({ body: signinSchema }), login);
app.post('/signup', celebrate({ body: signupSchema }), createUser);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT);
