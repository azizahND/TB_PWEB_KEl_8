'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jawabanEvaluasis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idPertanyaan: {
        type: Sequelize.INTEGER,
        references: {
          model: 'pertanyaans', // Nama tabel yang dirujuk
          key: 'id' // Kolom pada tabel yang dirujuk
        }
      },
      idMahasiswa: {
        type: Sequelize.INTEGER,
        references: {
          model: 'mahasiswas', // Nama tabel yang dirujuk
          key: 'id' // Kolom pada tabel yang dirujuk
        }
      },
      jawaban: {
        type: Sequelize.STRING
      },
      tanggal: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('jawabanEvaluasis');
  }
};