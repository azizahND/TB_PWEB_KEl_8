const bcrypt = require('bcrypt');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;

    // Hash the passwords before inserting into the database
    const hashedPasswordAdmin = await bcrypt.hash('admin123', saltRounds);
    const hashedPasswordRasyid = await bcrypt.hash('3012', saltRounds);

    return queryInterface.bulkInsert('admins', [{
      username: 'admin',
      email: 'admin@gmail.com',
      password: hashedPasswordAdmin,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'rasyid',
      email: 'rasyid@student.unand.ac.id',
      password: hashedPasswordRasyid,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('admins', null, {});
  }
};
