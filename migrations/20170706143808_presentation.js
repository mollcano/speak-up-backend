
exports.up = function(knex, Promise) {
  return knex.schema.createTable('presentation', table => {
    table.increments();
    table.string("title").notNullable();
    table.integer('user_id').references('myuser.id');
    table.decimal("confidence");
    table.text("transcript");
    table.integer("number_of_fillers");
    table.integer("hesitation");
    table.integer("so");
    table.integer("like");
    table.integer("you_know");
    table.integer("well");
    table.integer("actually");
    table.integer("basically");
    table.integer("i_mean");
    table.decimal("pauses");
    table.dateTime("date").notNullable().defaultTo(knex.fn.now());
    table.decimal("length_of_audio");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('presentation');
};
