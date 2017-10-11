
exports.up = function(knex, Promise) {
  return knex.schema.createTable('email_list', function(table){
      table.increments();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable().unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('email_list');
};
