'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10; 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const hashedPassword1 = await bcrypt.hash('admin123', saltRounds);
    const hashedPassword2 = await bcrypt.hash('2022', saltRounds);
    const hashedPassword3 = await bcrypt.hash('3018', saltRounds);
    const hashedPassword4 = await bcrypt.hash('3012', saltRounds);
   

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
      },
      {
       
        email: '2211523018_najwa@student.unand.ac.id',
        password: hashedPassword3,
        username: 'Najwa Nur Faizah',
        role: 'mahasiswa',
        createdAt : new Date(),
        updatedAt: new Date()
      },
      {
       
        email: '2111523012_rasyid@student.unand.ac.id',
        password: hashedPassword4,
        username: 'Rasyid Nugrahesa',
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