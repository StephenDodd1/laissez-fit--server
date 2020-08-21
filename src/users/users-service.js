const UsersService = {
  authenticateUser(knex, username){
    return knex('users')
      .where({'username': username})
      .first()
  },
  createUser(knex, user){
    return knex
    .into("users").insert(user)
  }
}
module.exports = UsersService;