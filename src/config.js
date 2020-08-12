module.exports = {
   PORT: process.env.PORT || 8000,
   NODE_ENV: process.env.NODE_ENV || 'development',
   CLIENT_ORIGIN: "http://localhost:8000" || "https://laissez-fit-client.vercel.app/",
   DATABASE_URL: "postgresql://postgres@localhost/laissez_fit"
 }