'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      this.hasMany(Post, { foreignKey: 'name', as: 'posts' })
    }

    // toJSON() {
    //   return { ...this.get(), id: undefined }
    // }
  }
  User.init(
    {
      // userId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  )
  return User
}
