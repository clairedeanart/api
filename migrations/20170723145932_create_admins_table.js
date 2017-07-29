
exports.up = function(knex, Promise) {
  return knex.schema.createTable('admins', function(table) {
    table.increments()
    table.string('username').unique().notNullable();
    table.string('password').notNullable();
    table.string('first_name');
    table.string('last_name');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('admins');
};
