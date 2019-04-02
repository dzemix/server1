const {Article, User} = require('../models')
module.exports = {
  async index (req, res) {
    try {
      const search = req.query.search
      let articles = null
      let pagination = req.params.pagination
      pagination = (pagination - 1) * 2
      console.log(pagination)
      let length = await Article.count()
      length = length / 2
      if (length % 1 !== 0) {
        length = Math.floor(length)
        length++
      }
      console.log('arraylength', length)
      if (pagination) {
        articles = await Article.findAll({
          offset: pagination,
          limit: 2,
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
      } else {
        if (search) {
          articles = await Article.findAll({
            where: {
              $or: [
                'title', 'article'
              ].map(key => ({
                [key]: {
                  $like: `%${search}%`

                }
              }))
            },
            include: {
              model: User
            },
            order: [
              [
                'createdAt', 'DESC'
              ]
            ]
          })
        } else {
          articles = await Article.findAll({
            limit: 2,
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
        }
      }
      console.log(articles)
      res.status(200).json({
        'articles': articles,
        'length': length
      })
    } catch (err) {
      res.status(500).send({
        error: 'no articles here'
      })
    }
  },
  async show (req, res) {
    try {
      const articleId = req.params.articleId
      const article = await Article.findOne({
        where: {
          id: articleId
        },
        include: [
          {
            model: User
          }
        ]
      })
      res.send(article)
    } catch (err) {
      res.status(500).send({
        error: 'no articles here'
      })
    }
  },
  async post (req, res) {
    try {
      console.log(req.body)
      const article = await Article.create(req.body)
      res.send(article)
    } catch (err) {
      res.status(500).send({
        error: 'something gone wrong with creating'
      })
    }
  },
  async delete (req, res) {
    try {
      const articleId = req.params.articleId
      const article = await Article.findById(articleId)
      article.destroy()
      res.send(article)
    } catch (err) {
      res.status(500).send({
        error: 'u cant delete'
      })
    }
  }
}
