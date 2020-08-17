const express = require("express");
const CommentsService = require("./comments-service");
const commentsRouter = express.Router();
const jsonBodyParser = express.json();
const xss = require("xss");

const serializeComments = (comment) => ({
  username: comment.username,
  comment: xss(comment.comment)
})
commentsRouter.route('/api/:articleId/comments').get((req,res,next) => {
  const knex = req.app.get('db')
  const article_id = req.params.articleId
  CommentsService.getAllComments(knex, article_id)
  .then((comment) => {
    if (!comment) {
      return res.status(404).json({
        error: { message: `Comment doesn't exist` },
      });
    }
    res.status(200).json(comment.map(serializeComments));
  })
  .catch(next);
})
commentsRouter.route('/api/:articleId/comment').post(jsonBodyParser, (req,res,next) => {
  const knex = req.app.get('db');
  const article_id = req.params.articleId;
  const user_id = req.body.user_id;
  const comment = req.body.comment;
  console.log('aid', article_id, 'uid', user_id, 'comment', comment)
  const newComment = {
    article_id,
    user_id,
    comment
  }
  console.log(newComment)
  CommentsService.createComment(knex, newComment)
  .then((comment) => {
    if (!comment) {
      return res.status(404).json({
        error: { message: `Comment doesn't exist` },
      });
    }
    res.status(200).json(comment);
  })
  .catch(next);
})
commentsRouter.route('/api/comment/:commentId').delete((req,res,next) => {
  const knex=req.app.get('db');
  const comment_id = req.params.commentId;
  CommentsService.deleteComment(knex, comment_id)
  .then((comment) => {
    if (!comment) {
      return res.status(404).json({
        error: { message: `Comment was not deleted` },
      });
    }
    res.status(200).json(comment);
  })
  .catch(next);
})

module.exports = commentsRouter;