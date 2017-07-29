'use strict';

const Errors = require('./generic');

function attachUtilityToResponse(req, res, next) {

  res.error = {};
  res.error.next = function(e) { next(e) }
  res.error.generic = function(message) {
    var e = new Errors.Generic(message);
    console.error('A client error occurred', message, e.stack);
    next(e);
  };
  res.error.internal = function(error) {
    var e = new Errors.Internal(error);
    console.error('An internal error occurred', error.stack, e.stack);
    next(e);
  };
  res.error.invalid = function(message) {
    var e = new Errors.InvalidData(message);
    console.error('Missing or invalid data', message);
    next(e);
  };
  res.error.unauthorized = function(message) {
    var e = new Errors.Unauthorized(message);
    console.error('An unauthorized error occurred', message, e.stack);
    next(e);
  };

  res.success = function(data) {
    return res.status(200).json(data);
  };

  next();
};

function handleErrorResponse (error, req, res, next) {
  console.log("'here?!'")
  var code = error.statusCode;
  if (!code || code < 100 || code >= 600) {
    code = 500;
  }
  let payload = {
    message: error.message,
    type: error.status,
    request: {
      body: req.body,
      params: req.params,
      url: req.url,
    }
  };
  if (process.env.NODE_ENV === 'development') {
    payload = Object.assign({}, payload, {
      error,
      stack: error.stack,
    })
  }
  return res.status(code).json(payload);
};


module.exports = {
  attachUtilityToResponse,
  handleErrorResponse
};
