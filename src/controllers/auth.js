const router = require('express').Router();
const Errors = require('../helpers/errors/generic');
const Admin = require('../models/admin');
const expressJWT = require('express-jwt');

router.get('/', expressJWT({
    secret: process.env.JWT_SECRET
  }), function(req, res) {
    req.user ? res.success(Admin.Model.forge(req.user)) : res.unauthorized()
  });

router.post('/login', (req, res, next) => {
  const user = req.body;
  if (user && user.username && user.password) {
    Admin.login(user)
    .then(res.success)
    .catch(next)
  } else return res.error.unauthorized('Invalid username or password');
});

router.post('/register', (req, res, next) => {
  if (req.headers['register-key'] && req.headers['register-key'] === process.env.REGISTER_KEY) {
    Admin.create(req.body)
    .then(res.success)
    .catch(next);
  } else return res.error.unauthorized('Missing or invalid registration key.');
});

module.exports = router;
