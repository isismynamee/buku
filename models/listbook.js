'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class listbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      listbook.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      });
      listbook.belongsTo(models.genrebook, {
        as: "genre",
        foreignKey: {
          name: "idGenre",
        },
      });
    }
  }
  listbook.init({
    idGenre: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'listbook',
  });
  return listbook;
};