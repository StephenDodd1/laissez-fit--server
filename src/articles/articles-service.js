const ArticlesService = {
  getAllArticles(knex) {
  return knex("articles")
    .join("users", "articles.user_id", "=", "users.id")
    .select(
      "articles.id",
      "users.username",
      "articles.genre",
      "articles.title",
      "articles.content",
      "articles.article_date"
    );
},
}
module.exports = ArticlesService;