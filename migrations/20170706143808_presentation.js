
exports.up = function(knex, Promise) {
  return knex.schema.createTable('presentation', table => {
    table.increments();
    table.string("title").notNullable();
    table.integer('user_id').references('myuser.id');
    table.decimal("confidence");
    table.text("transcript");
    table.integer("number_of_fillers");
    table.json("fillers")
    table.integer("hesitation");
    table.integer("so");
    table.integer("like");
    table.integer("you_know");
    table.integer("well");
    table.integer("actually");
    table.integer("basically");
    table.integer("i_mean");
    table.decimal("pauses");
    table.decimal("wpm");
    table.json("pace");
    table.decimal("part1");
    table.decimal("part2");
    table.decimal("part3");
    table.decimal("part4");
    table.decimal("part5");
    table.decimal("part6");
    table.decimal("part7");
    table.decimal("part8");
    table.decimal("part9");
    table.decimal("part10");
    table.dateTime("date").notNullable().defaultTo(knex.fn.now());
    table.decimal("length_of_audio");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('presentation');
};
