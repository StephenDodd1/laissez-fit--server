module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'production',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "https://laissez-fit-client.vercel.app",
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres@localhost/laissez_fit" /*|| "postgresql://postgres@localhost/laissez_fit"*/,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: 6000000
 }