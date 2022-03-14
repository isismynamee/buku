'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      book.belongsToMany(models.topic, {
        as: "topic",
        through: {
          model: "genrebook",
          as: "bridge"
        },
        foreignKey: "idBook"
      })
    }
  }
  book.init({
    author: DataTypes.STRING,
    title: DataTypes.STRING,
    describe: DataTypes.STRING,
    bookfile: DataTypes.STRING,
    publicationdate: DataTypes.DATE,
    language: DataTypes.STRING,
    image: DataTypes.STRING,
    isbn: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'book',
  });
  return book;
};