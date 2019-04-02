const {Bookmark} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const {articleId, userId} = req.query
      const bookmark = await Bookmark.findOne({
        where: {
          ArticleId: articleId,
          UserId: userId
        }
      })
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to fetch'
      })
    }
  }
}
