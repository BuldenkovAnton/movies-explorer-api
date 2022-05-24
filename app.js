const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleError } = require('./middlewares/errors');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(requestLogger);

app.use(errorLogger);
app.use(handleError);

app.listen(PORT);
