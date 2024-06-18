'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('jawabanEvaluasis', 'idPertanyaan');
    await queryInterface.removeColumn('jawabanEvaluasis', 'jawaban');
    await queryInterface.removeColumn('jawabanEvaluasis', 'tanggal');
    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('jawabanEvaluasis', 'idPertanyaan', {
      type: Sequelize.INTEGER,
      references: {
        model: 'pertanyaans', // Nama tabel yang dirujuk
        key: 'id' // Kolom pada tabel yang dirujuk
      }
    });
    await queryInterface.addColumn('jawabanEvaluasis', 'jawaban', {
      type: Sequelize.STRING
    });
    await queryInterface.addColumn('jawabanEvaluasis', 'tanggal', {
      type: Sequelize.DATE
    });
    
  }
};
