exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('myuser').del()
    .then(function () {
      // Inserts seed entries
      return knex('myuser').insert([
        {first_name: "Molly", last_name: "Brooks", email: "mollyjbrooks@gmail.com", password: "hello", isAdmin: true},
      ]);
    });
};
