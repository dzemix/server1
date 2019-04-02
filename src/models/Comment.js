
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.STRING
  })

  Comment.associate = function (models) {
    Comment.belongsTo(models.User)
    Comment.belongsTo(models.Article)
  }

  return Comment
}
