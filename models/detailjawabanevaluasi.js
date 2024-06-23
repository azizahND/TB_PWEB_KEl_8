'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DetailJawabanEvaluasi extends Model {
    static associate(models) {
      DetailJawabanEvaluasi.belongsTo(models.pertanyaan, {
        foreignKey: 'idPertanyaan',
        as: 'pertanyaan'
      });
      DetailJawabanEvaluasi.belongsTo(models.jawabanEvaluasi, {
        foreignKey: 'idJawabanEvaluasi',
        as: 'jawabanEvaluasi'
      });
      DetailJawabanEvaluasi.hasOne(models.feedback, {
        foreignKey: 'idDetailJawaban',
        as: 'feedback'
      });
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
      allowNull: false,
      references: {
        model: 'pertanyaans',
        key: 'id'
      }
    },
    jawaban: {
      type: DataTypes.STRING
    },
    picture: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    idJawabanEvaluasi: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'jawabanEvaluasis',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'DetailJawabanEvaluasi',
  });

  return DetailJawabanEvaluasi;
};
