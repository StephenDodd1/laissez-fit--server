const express = require("express");
const ArticlesService = require("./articles-service");
const articlesRouter = express.Router();
const jsonBodyParser = express.json();
const xss = require("xss");

articlesRouter.route("/api/articles").get((req, res, next) => {
  const knex = req.app.get("db");
  ArticlesService.getAllArticles(knex);
});
articlesRouter.route("/api/article/").get(jsonBodyParser, (req, res, next) => {
  const knex = req.app.get("db");
  const { searchTerm } = req.body;
  ArticlesService.getAllArticles(knex, searchTerm);
});
articlesRouter.route("/api/article").post(jsonBodyParser, (req, res, next) => {
  const knex = req.app.get("db");
  const { title, content } = req.body;
  const article = {
    title,
    content
  }
  ArticlesService.createArticle(knex, article);
});

module.exports = articlesRouter;