const {Comment, User} = require('../models')
module.exports = {
  async post (req, res) {
    try {
      const comment = await Comment.create(req.body)
      res.send(comment)
    } catch (err) {
      res.status(500).send({
        error: 'something gone wrong with creating'
      })
    }
  },
  async get (req, res) {
    try {
      const articleId = req.params.articleId
      const comment = await Comment.findAll({
        where: {
          ArticleId: articleId
        },
        include: [
          {
            model: User
          }
        ],
        order: [
          [
            'createdAt', 'DESC'
          ]
        ]
      })
      res.send(comment)
    } catch (err) {
      res.status(500).send({
        error: 'no articles here'
      })
    }
  },
  async delete (req, res) {
    try {
      const commentId = req.params.commentId
      await console.log('commentid', commentId)
      const comment = await Comment.findById(commentId)
      comment.destroy()
      res.send(comment)
    } catch (err) {
      res.status(500).send({
        error: 'something gone wrong with creating'
      })
    }
  },
  async patch (req, res) {
    try {
      const {id, comment} = req.body
      const comments = await Comment.findById(id)
      comments.comment = comment
      comments.save()
      res.send(comments)
    } catch (err) {
      res.status(500).send({
        error: 'something gone wrong with creating'
      })
    }
  }
}
