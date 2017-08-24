
exports.up = function(knex, Promise) {
  return knex.schema.table('images', function(table) {
    table.boolean('hidden').defaultTo(false);
    table.boolean('unedited').defaultTo(true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('images', function(table) {
    table.dropColumn('hidden');
    table.dropColumn('unedited');
  });
};
