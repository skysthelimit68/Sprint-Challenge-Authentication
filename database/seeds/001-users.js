const bcryptjs = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'crankyDad', password: bcryptjs.hashSync('1234',8) },
        {username: 'spunkyDad', password: bcryptjs.hashSync('1234',8) },
        {username: 'theDude', password: bcryptjs.hashSync('1234',8) }
      ]);
    });
};

