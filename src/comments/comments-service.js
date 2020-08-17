const CommentsService = {
  getAllComments(knex, articleId) {
     return knex("comments")
     .join("users", "comments.user_id", "=", "users.id")
     .select(
       "comments.id",
       "users.username",
       "comments.article_id",
       "comments.comment",
       "comments.comment_date"
     )
     .where('article_id', articleId);
 },
  createComment(knex, comment) {
     return knex
        .into('comments')
        .insert(comment)
  },
  deleteComment(knex, comment_id) {
     return knex('comments')
        .where({id: comment_id})
        .del()
  }
}
module.exports = CommentsService;