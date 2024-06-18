'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10; // Jumlah putaran salt, semakin tinggi semakin aman, namun proses hashing akan lebih lambat

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Hash passwords
    const hashedPassword1 = await bcrypt.hash('admin123', saltRounds);
    const hashedPassword2 = await bcrypt.hash('2022', saltRounds);
   

    return queryInterface.bulkInsert('users', [
      {
       
        email: 'admin@gmail.com',
        password: hashedPassword1,
        username: 'Admin',
        role: 'admin',
        createdAt : new Date(),
        updatedAt: new Date()
        
      },
      {
       
        email: '2211522022_azizah@student.unand.ac.id',
        password: hashedPassword2,
        username: 'Azizah Novi Delfianti',
        role: 'mahasiswa',
        createdAt : new Date(),
        updatedAt: new Date()
      }
      
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};