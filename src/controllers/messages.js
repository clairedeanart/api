const router = require('express').Router();
const Message = require('../models/message');
const _ = require('underscore');

router.post('/', (req, res, next) => {
  const data = Object.assign({}, req.body, {
    toEmail: 'hottmanmichael@gmail.com'
  });
  Message.Model.forge(data)
  .save()
  .then((message) => { return message.sendEmail() })
  .then((message) => { res.send(message) })
  .catch(next);
});

module.exports = router
