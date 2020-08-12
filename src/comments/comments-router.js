const express = require("express");
const CommentsService = require("./comments-service");
const commentsRouter = express.Router();
const jsonBodyParser = express.json();
const xss = require("xss");

const serializeComments = (comment) => ({
  userId: comment.user_id,
  comment: xss(comment.comment)
})
commentsRouter.route('/api/:postId/comments').get((req,res,next) => {
  const knex = req.app.get('db')
  const post_id = req.params.postId
  CommentsService.getAllComments(knex, post_id)
})
commentsRouter.route('api/:postId/comment').post(jsonBodyParser, (req,res,next) => {
  const knex = req.app.get('db');
  const post_id = req.params.postId;
  const { user_id, comment } = req.body;
  const newComment = {
    post_id,
    user_id,
    comment
  }
  CommentsService.createComment(knex, newComment)
})
commentsRouter.route('api/comment/commentId').delete((req,res,next) => {
  const knex=req.app.get('db');
  const comment_id = req.params.commentId;
  CommentsService.deleteComment(knex, comment_id)
})

module.exports = commentsRouter;