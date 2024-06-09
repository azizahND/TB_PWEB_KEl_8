'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    static associate(models) {
      admin.belongsTo(models.user, {
        foreignKey: 'idUser',
        as: 'user',
      });
    }
    }

  admin.init({
    idUser: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    nip: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'admin',
  });
  return admin;
};