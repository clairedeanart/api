const env = process.env.NODE_ENV || 'development';
const config = require('../../knexfile')[env];
const knex = require('knex')(config);
var Schema = require('bookshelf-schema');
var mask = require('bookshelf-mask');

global.Bookshelf = require('bookshelf')(knex);
Bookshelf.plugin(Schema());
Bookshelf.plugin(mask);

global.Knex = knex
