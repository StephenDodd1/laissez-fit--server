const UsersService = {
  authenticateUser(knex, username, password){
    return knex('users')
      .where({'username': username})
      .andWhere({'password': password})
      .first()
  },
  createUser(knex, user){
    return knex
    .into("users").insert(user)
  }
}
module.exports = UsersService;