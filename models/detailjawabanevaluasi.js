'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DetailJawabanEvaluasi extends Model {
    static associate(models) {
      DetailJawabanEvaluasi.belongsTo(models.pertanyaan, { foreignKey: 'idPertanyaan', as: 'pertanyaan' });
      DetailJawabanEvaluasi.belongsTo(models.jawabanEvaluasi, { foreignKey: 'idJawabanEvaluasi', as: 'jawabanEvaluasi' });
    }
  }
  DetailJawabanEvaluasi.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idPertanyaan: {
      type: DataTypes.INTEGER,
      allowNull: false // Pastikan idPertanyaan tidak boleh kosong
    },
    jawaban: {
      type: DataTypes.STRING
    },
    idJawabanEvaluasi: {
      type: DataTypes.INTEGER,
      allowNull: false // Pastikan idJawabanEvaluasi tidak boleh kosong
    }
  }, {
    sequelize,
    modelName: 'DetailJawabanEvaluasi',
  });

  return DetailJawabanEvaluasi;
};