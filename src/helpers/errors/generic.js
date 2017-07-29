'use strict';
function Generic(message) {
  this.message = message || 'An error has occured.';
  this.status = 'Error';
  this.type = 'GenericError';
  this.statusCode = 400;
}
Generic.prototype = Object.create(Error.prototype);

function InvalidData(message) {
  this.message = message || 'Invalid or missing data in your request.';
  this.status = 'Invalid';
  this.type = 'InvalidData';
  this.statusCode = 422;
}
Generic.prototype = Object.create(Error.prototype);

function Unauthorized(message) {
  if (!message) message = "Unauthorized request."
  this.message = message;
  this.status = 'Unauthorized';
  this.type = 'UnauthorizedError';
  this.statusCode = 401;
}
Unauthorized.prototype = Object.create(Error.prototype);

function Internal(error) {
  this.message = 'An error has occurred';
  this.error = error;
  this.type = 'InternalData';
  this.stack = error && error.stack ? error.stack : "Undefined error";
}
Internal.prototype = Object.create(Error.prototype);

module.exports = {
  Generic,
  Unauthorized,
  Internal,
  InvalidData,
};
