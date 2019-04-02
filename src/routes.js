const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ArticleController = require('./controllers/ArticleController')
const BookmarksController = require('./controllers/BookmarksController')
const CommentController = require('./controllers/CommentController')
const isAuthenticated = require('./policies/isAuthenticated')
module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/login',
    AuthenticationController.login)
  app.get('/articles/:pagination?',
    isAuthenticated,
    ArticleController.index)
  app.post('/article',
    ArticleController.post)
  app.get('/article/:articleId',
    ArticleController.show)
  app.delete('/article/:articleId',
    ArticleController.delete)
  app.get('/bookmarks',
    BookmarksController.index)

  app.get('/comment/:articleId',
    CommentController.get)
  app.post('/comment',
    CommentController.post)
  app.delete('/comment/:commentId',
    CommentController.delete)
  app.patch('/comment',
    CommentController.patch)
}
