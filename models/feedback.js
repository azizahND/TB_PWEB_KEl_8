'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class feedback extends Model {
    static associate(models) {
      feedback.belongsTo(models.DetailJawabanEvaluasi, {
        foreignKey: 'idDetailJawaban',
        as: 'detailJawabanEvaluasi',
      });
      feedback.belongsTo(models.admin, {
        foreignKey: 'idAdmin',
        as: 'admin',
      });
    }
  }

  feedback.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idDetailJawaban: {
      type: DataTypes.INTEGER
    },
    idAdmin: {
      type: DataTypes.INTEGER
    },
    feedback: {
      type: DataTypes.STRING
    },
    tanggal: {
      type: DataTypes.DATE
    },
    picture: {
      type: DataTypes.BLOB
    },
  }, {
    sequelize,
    modelName: 'feedback',
  });

  return feedback;
};