const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { cors } = require('./middlewares/cors');
const { limiter } = require('./middlewares/limitter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleError } = require('./middlewares/errors');

const appRoutes = require('./routes/index');

const { NODE_ENV, MONGO_DB } = process.env;
mongoose.connect(
  NODE_ENV === 'production'
    ? MONGO_DB
    : 'mongodb://localhost:27017/bitfilmsdb',
);

const app = express();
const { PORT = 3000 } = process.env;

app.use(requestLogger);
app.use(cors);
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', appRoutes);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT);
