'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      Feedback.belongsTo(models.jawabanEvaluasi, {
        foreignKey: 'idJawaban',
        as: 'jawabanEvaluasi',
      });
      Feedback.belongsTo(models.admin, {
        foreignKey: 'idAdmin',
        as: 'admin',
      });
    }
  }

  Feedback.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idJawaban: {
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
    modelName: 'Feedback',
  });

  return Feedback;
};
