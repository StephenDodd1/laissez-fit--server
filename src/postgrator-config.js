require('dotenv').config();

module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "connectionString": "postgresql://postgres@localhost/laissez_fit"
   // "ssl": !!process.env.SSL
}