'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'jijah',
        password: 'jijah123',
        nim: '2211522022',
        role: 'mahasiswa',
        
      },
      {
        username: 'najwa',
        password: 'najwa123',
        nim: '2211523018',
        role: 'mahasiswa',
        
      },
      {
        username: 'rasyid',
        password: 'rasyid',
        nim: '2111523012',
        role: 'mahasiswa',
        
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
