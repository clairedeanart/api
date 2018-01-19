
exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', function(table) {
    table.increments().primary();
    table.text('text').notNullable();
    table.string('from_email').notNullable();
    table.string('from_name').notNullable();
    table.string('to_email').notNullable();
    table.integer('image_id').references('images');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
