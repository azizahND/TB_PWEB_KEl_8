'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jawabanEvaluasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  jawabanEvaluasi.init({
    idPertanyaan: DataTypes.INTEGER,
    idMahasiswa: DataTypes.INTEGER,
    jawaban: DataTypes.STRING,
    tanggal: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'jawabanEvaluasi',
  });
  return jawabanEvaluasi;
};