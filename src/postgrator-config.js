require('dotenv').config();

module.exports = {
  "migrationsDirectory": "migrations",
  "driver": "pg",
  "connectionString": process.env.DATABASE_URL || "postgresql://postgres@localhost/laissez_fit",
  "ssl": !!process.env.SSL
}