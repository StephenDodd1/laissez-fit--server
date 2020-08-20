module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'production',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:3000", //"https://laissez-fit-client.vercel.app/",
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: 10000
 }