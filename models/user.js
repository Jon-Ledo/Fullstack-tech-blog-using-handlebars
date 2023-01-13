const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require('../config/connection')

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password)
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [8, 30],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,

      // weak validation for purposes of this project
      validate: {
        len: [1],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10)
        return newUserData
      },
    },

    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
)

module.exports = User
