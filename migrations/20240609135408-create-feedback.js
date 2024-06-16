'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('feedbacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idJawaban: {
        type: Sequelize.INTEGER,
        references: {
          model: 'jawabanEvaluasis', // Nama tabel yang dirujuk
          key: 'id' // Kolom pada tabel yang dirujuk
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      idAdmin: {
        type: Sequelize.INTEGER,
        references: {
          model: 'admins', // Nama tabel yang dirujuk
          key: 'id' // Kolom pada tabel yang dirujuk
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      feedback: {
        type: Sequelize.STRING
      },
      tanggal: {
        type: Sequelize.DATE
      },
      picture: {
        type: Sequelize.BLOB
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('feedbacks');
  }
};
