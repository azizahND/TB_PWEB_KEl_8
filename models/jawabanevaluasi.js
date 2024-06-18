'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jawabanEvaluasi extends Model {
    static associate(models) {
      
      jawabanEvaluasi.belongsTo(models.mahasiswa, {
        foreignKey: 'idMahasiswa',
        as: 'mahasiswa',
      });
    }
  }
  jawabanEvaluasi.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    
    idMahasiswa: {
      type: DataTypes.INTEGER
    },
    
  }, {
    sequelize,
    modelName: 'jawabanEvaluasi',
  });
  return jawabanEvaluasi;
};
