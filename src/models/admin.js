const BaseModel = require("./default").Model;
var bcrypt = require('bcrypt');
const Errors = require('../helpers/errors/generic');
const jwt = require('jsonwebtoken');

// Model
const Admin = BaseModel.extend({
  tableName: 'admins'
}, {
  schema: [
    'username',
    'password',
    'lastName',
    'firstName',
    'createdAt',
    'updatedAt'
  ],
  // masks: {
  //   custom: 'password'
  // }
});

// Helpers
const saltRounds = 10;
function create(admin) {
  return new Promise(function(resolve, reject) {
    bcrypt.hash(admin.password, saltRounds, (err, hash) => {
      if (err) { return reject() }
      const newUser = new Admin(Object.assign({}, admin, {
        password: hash,
      }))
      newUser.save()
      .then((admin) => {
        // admin.unset('password')
        const token = jwt.sign(admin.toJSON(), process.env.JWT_SECRET);
        resolve({
          user: admin,
          token: token
        });
      })
      .catch(reject);
    });
  });
}

function login({username, password}) {
  return new Promise(function(resolve, reject) {
    const user = Admin.forge({username})
    user.fetch()
    .then((admin) => {
      if (admin) {
        bcrypt.compare(password, admin.get('password'), (err, res) => {
          if (err) { return reject(new Errors.Internal()) }
          if (!res) { return reject( new Errors.Generic('Invalid password or username') ) }
          else {
            // admin.unset('password')
            console.log('logged in admin', admin)
            const token = jwt.sign(admin.toJSON(), process.env.JWT_SECRET);
            resolve({
              user: admin,
              token: token
            });
          }
        });
      } else return reject(new Errors.Generic('Invalid password or username'))
    })
    .catch(reject);
  });
}

module.exports = {
  create,
  login,
  Model: Admin,
};
