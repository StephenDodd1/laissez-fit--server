const UsersService = {
  authenticateUser(knex, username) {
    return knex("users").where({ username: username }).first();
  },
  createUser(knex, user) {
    return knex.into("users").insert(user);
  },
  deleteUser(knex, user_id) {
    return knex("users").where({id: user_id}).delete();
  },
};
module.exports = UsersService;
