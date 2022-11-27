'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Title is required',
          },
          min: {
            args: 20,
            msg: 'Title must be at least 20 characters',
          },
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: 'Content is required' },
          min: { args: 200, msg: 'Content must be at least 200 characters' },
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Category is required' },
          min: { args: 10, msg: 'Category must be at least 10 characters' },
        },
      },
      status: {
        type: DataTypes.ENUM('Publish', 'Draft', 'Trash'),
        allowNull: false,
        validate: {
          notNull: { msg: 'Status is required' },
          isIn: {
            args: [['Publish', 'Draft', 'Trash']],
            msg: 'Status must be Publish, Draft, or Trash',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );
  return Post;
};
