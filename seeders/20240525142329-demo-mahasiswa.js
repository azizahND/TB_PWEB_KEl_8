const bcrypt = require('bcrypt');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;

    // Hash the passwords before inserting into the database
    const hashedPasswordAzizah = await bcrypt.hash('2022', saltRounds);
    const hashedPasswordRasyid = await bcrypt.hash('3012', saltRounds);
    const hashedPasswordNajwa = await bcrypt.hash('3018', saltRounds);

    return queryInterface.bulkInsert('mahasiswas', [{
      username: 'azizah',
      email: '2111523012_rasyid@student.unand.ac.id',
      password: hashedPasswordAzizah,
      nim: '2211522022',
      role: 'mahasiswa',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'rasyid',
      email: '2111523012_rasyid@student.unand.ac.id',
      password: hashedPasswordRasyid,
      nim: '2111523012',
      role: 'mahasiswa',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'najwa',
      email: '2211523018_najwa@student.unand.ac.id',
      password: hashedPasswordNajwa,
      nim: '2111523018',
      role: 'mahasiswa',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('mahasiswas', null, {});
  }
};
