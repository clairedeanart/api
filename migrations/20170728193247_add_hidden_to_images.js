
exports.up = function(knex, Promise) {
  return knex.schema.table('images', function(table) {
    table.boolean('hidden');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('images', function(table) {
    table.dropColumn('hidden');
  });
};
