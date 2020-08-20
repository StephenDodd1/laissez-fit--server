require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const { NODE_ENV, CLIENT_ORIGIN, DATABASE_URL } = require("./config");

const articlesRouter = require("./articles/articles-router")
const commentsRouter = require("./comments/comments-router")
const trackingRouter = require("./tracking/tracking-router")
const usersRouter = require("./users/users-router")

const app = express();
const morganOption = NODE_ENV === "production" ? "tiny" : "common";
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: DATABASE_URL,
});
app.set("db", db);

app.use(morgan(morganOption));
app.use(helmet());
app.use(
  cors()
);

app.use(articlesRouter);
app.use(commentsRouter);
app.use(trackingRouter);
app.use(usersRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    respone = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});
app.get("*", function (req, res, next) {
  if (req.url === "/") return next();
});
app.get("/", (req, res) => {
  res.send("Hello, world!");
});


module.exports = app;
