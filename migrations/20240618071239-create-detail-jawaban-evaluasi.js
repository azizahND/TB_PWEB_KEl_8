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
      idJawabanEvaluasi: {
        type: Sequelize.INTEGER,
        references: {
          model: 'jawabanevaluasis', // Nama tabel yang dirujuk
          key: 'id' // Kolom pada tabel yang dirujuk
        }
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
    await queryInterface.dropTable('detailJawabanEvaluasis');
  }
};