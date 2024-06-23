'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detailJawabanEvaluasis', {
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
      jawaban: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      idJawabanEvaluasi: {
        type: Sequelize.INTEGER,
        references: {
          model: 'jawabanevaluasis', // Nama tabel yang dirujuk
          key: 'id' // Kolom pada tabel yang dirujuk
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detailJawabanEvaluasis');
  }
};