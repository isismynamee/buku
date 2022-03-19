'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class genrebook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      genrebook.hasMany(models.listbook, {
        as: "genre",
        foreignKey: {
          name: "idGenre",
        },
      });
    }
  }
  genrebook.init({
    idBook: DataTypes.INTEGER,
    idTopics: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'genrebook',
  });
  return genrebook;
};