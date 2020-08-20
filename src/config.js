module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'production',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "https://laissez-fit-client.vercel.app/",
  DATABASE_URL: process.env.DATABASE_URL || "postgres://fganolsibrybdd:a9a33dfb3c8d92f86b4fa09e64ee74fa225b553a61fe222292c32a0119350581@ec2-3-208-50-226.compute-1.amazonaws.com:5432/d3njn0mlkldsl5" /*|| "postgresql://postgres@localhost/laissez_fit"*/,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: 10000
 }