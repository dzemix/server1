
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    headline: DataTypes.STRING,
    article: DataTypes.STRING
  })

  Article.associate = function (models) {
    Article.belongsTo(models.User)
  }

  return Article
}
