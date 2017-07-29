'use strict';

require('dotenv').config();
require('./globals')
const express = require('express'),
  app = express();

const bodyParser = require('body-parser'),
  logger = require('morgan'),
  cors = require('cors'),
  expressJWT = require('express-jwt');

const port = process.env.PORT || 4000;
const url = process.env.URL || 'http://localhost:'
const Errors = require('./src/helpers/errors/generic');
const Middleware = require('./src/helpers/errors/middleware');
const AppRouter = require('./src/controllers/base');

app.use(Middleware.attachUtilityToResponse);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

//ROUTER
app.use(AppRouter);

//handle errors
app.use(Middleware.handleErrorResponse);

app.listen(port, function() {
  console.log(`Claire Dean Art API @ ${url}${port}`)
});

module.exports = app;
