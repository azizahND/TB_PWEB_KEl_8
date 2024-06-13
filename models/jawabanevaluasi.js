'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jawabanEvaluasi extends Model {
    static associate(models) {
      jawabanEvaluasi.belongsTo(models.pertanyaan, {
        foreignKey: 'idPertanyaan',
        as: 'pertanyaan',
      }),
      jawabanEvaluasi.belongsTo(models.mahasiswa, {
        foreignKey: 'idMahasiswa',
        as: 'mahasiswa',
      }
    );
    }
    }
  jawabanEvaluasi.init({
   
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      idPertanyaan: {
        type: DataTypes.INTEGER
      },
      idMahasiswa: {
        type: DataTypes.INTEGER
      },
      jawaban: {
        type: DataTypes.STRING
      },
      tanggal: {
        type: DataTypes.DATE
      },  
    
  },
   {
    sequelize,
    modelName: 'jawabanEvaluasi',
  });
  return jawabanEvaluasi;
};