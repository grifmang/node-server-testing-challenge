
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'jeff', password: "jeff", department: "HR"},
        {username: 'joe', password: "joe", department: "Engineering"},
        {username: 'john', password: "john", department: "Accounting"}
      ]);
    });
};
