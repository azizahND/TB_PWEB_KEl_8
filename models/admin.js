'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    static associate(models) {
      admin.belongsTo(models.User, {
        foreignKey: 'idUser',
        as: 'user',
      });
    }
    }

  admin.init({
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
    nip: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING
    },
    
  },
   {
    sequelize,
    modelName: 'admin',
  });
  return admin;
};