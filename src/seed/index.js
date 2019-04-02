const {sequelize, User, Article, Bookmark} = require('../models')
const Promise = require('bluebird')
const users = require('./users.json')
const articles = require('./articles.json')
const bookmarks = require('./bookmarks.json')
sequelize.sync({force: true})
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )

    await Promise.all(
      articles.map(article => {
        Article.create(article)
      })
    )

    await Promise.all(
      bookmarks.map(bookmark => {
        Bookmark.create(bookmark)
      })
    )
  })
