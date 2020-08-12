const express = require("express");
const ArticlesService = require("./articles-service");
const articlesRouter = express.Router();
const jsonBodyParser = express.json();
const xss = require("xss");

const serializeArticles = (article) => ({
  articleId: article.id,
  type: article.type,
  title: xss(article.title),
  content: xss(article.content),
  author: article.author,
  articleDate: (article.article_date)
})
articlesRouter.route("/api/articles").get((req, res, next) => {
  const knex = req.app.get("db");
  ArticlesService.getAllArticles(knex).then((articles) => {
    if(!articles) {
      res.status(404).json({
        error: {message: "did not get articles"}
      })
    }
    console.log(articles)
    res.status(200).json(articles.map(serializeArticles))
  })
});
articlesRouter.route("/api/article/").get(jsonBodyParser, (req, res, next) => {
  const knex = req.app.get("db");
  const { searchTerm } = req.body;
  console.log(searchTerm)
  ArticlesService.searchArticle(knex, searchTerm).then((article) => {
    if(!article) {
      res.status(404).json({
        error: {message: "did not get articles"}
      })
    }
    console.log(article)
    res.status(200).json(article.map(serializeArticles))
  })
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