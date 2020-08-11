require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const { NODE_ENV, CLIENT_ORIGIN, DATABASE_URL } = require('./config')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';
const knex = require('knex')
app.use(morgan(morganOption))
app.use(helmet())
app.use(cors({
   origin: CLIENT_ORIGIN
}))
app.get('/', (req, res) => {
   res.send('Hello, world!')
})
app.use(function errorHandler(error, req, res, next) {
   let response
   if (NODE_ENV === 'production') {
      respone = { error: { message: 'server error'}}
   } else {
      console.error(error)
      response = {message: error.message, error }
   }
   res.status(500).json(response)
})

app.get('*', function(req, res, next) {
   if (req.url === '/') return next();
 });
module.exports = app