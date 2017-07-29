
exports.up = function(knex, Promise) {
  return knex.schema.createTable('images', function(table) {
    table.increments();
    // Storage related
    table.string('filename').notNullable();
    table.string('location', 3000).notNullable();
    table.string('mimetype');
    table.string('content_type');
    table.string('key');
    table.string('etag');
    // Public facing
    table.string('name');
    table.string('medium');
    table.timestamp('date');
    table.string('dimensions');
    table.string('price');
    table.boolean('sold');
    table.string('tags');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('images');
};
