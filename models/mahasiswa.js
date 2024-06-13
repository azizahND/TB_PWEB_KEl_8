'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mahasiswa extends Model {
      static associate(models) {
        mahasiswa.belongsTo(models.User, {
          foreignKey: 'idUser',
          as: 'user',
        });
      }
      }
  mahasiswa.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idUser: {
      type: DataTypes.INTEGER
    },
    nama: {
      type: DataTypes.STRING
    },
    nim: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'mahasiswa',
  });
  return mahasiswa;
};