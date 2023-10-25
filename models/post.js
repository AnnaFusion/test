'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      // userId
      this.belongsTo(User, { foreignKey: 'name', as: 'user' })
    }

    // toJSON() {
    //   return { ...this.get(), id: undefined, userId: undefined }
    // }
  }
  Post.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'posts',
      modelName: 'Post',
    }
  )
  return Post
}
