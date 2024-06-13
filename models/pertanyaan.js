'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pertanyaan extends Model {
    static associate(models) {
      pertanyaan.belongsTo(models.admin, {
        foreignKey: 'idAdmin',
        as: 'admin',
      });
    }
    }
  pertanyaan.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idAdmin: {
      type: DataTypes.INTEGER
    },
    pertanyaan: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'pertanyaan',
  });
  return pertanyaan;
};