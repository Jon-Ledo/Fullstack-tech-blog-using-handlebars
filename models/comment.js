const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
)

module.exports = Comment
