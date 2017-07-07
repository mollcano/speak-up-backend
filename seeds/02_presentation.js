
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('presentation').del()
    .then(function () {
      // Inserts seed entries
      return knex('presentation').insert([
        {id: 1, title: 'practice1', user_id: 1, confidence: 0.89, transcript: 'so this is my %hestiation practice', number_of_fillers: 2, hesitation: 1, so: 1, like: 0, you_know: 0, well: 0, actually: 0, basically: 0, i_mean: 0, pauses: 0.04, length_of_audio: 0.05
      }
      ]);
    });
};
