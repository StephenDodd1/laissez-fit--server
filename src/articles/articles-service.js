const ArticlesService = {
  getAllArticles(knex) {
  return knex("articles")
    .select(
      "articles.id",
      "articles.type",
      "articles.title",
      "articles.content",
      "articles.article_date"
    );
},
  searchArticle(knex, searchTerm) {
  return knex
    .select(      
    "articles.id",
    "articles.type",
    "articles.title",
    "articles.content",
    "articles.article_date"
    )
    .from("articles")
    .where("title", "like", `%${searchTerm}%`)
    .orWhere("content", "like", `%${searchTerm}%`);
},

}
module.exports = ArticlesService;