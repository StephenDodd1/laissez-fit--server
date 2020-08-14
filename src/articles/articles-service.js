const ArticlesService = {
  getAllArticles(knex) {
  return knex("articles")
    .select(
      "articles.id",
      "articles.topic",
      "articles.title",
      "articles.content",
      "articles.article_date"
    );
},
  searchArticle(knex, searchTerm) {
  return knex
    .select(      
    "articles.id",
    "articles.topic",
    "articles.title",
    "articles.content",
    "articles.article_date"
    )
    .from("articles")
    .where("title", "like", `%${searchTerm}%`)
    .orWhere("content", "like", `%${searchTerm}%`);
},
  createArticle(knex, article) {
    return knex.into("articles").insert(article);
},
}
module.exports = ArticlesService;