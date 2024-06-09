const { sequelize, User, Mahasiswa } = require('./models'); // Pastikan jalur ini benar sesuai dengan struktur proyek Anda

async function testAssociations() {
  try {
    // Sinkronisasi database (hanya untuk pengujian, jangan digunakan di produksi)
    await sequelize.sync({ force: true });

    // Membuat instance User
    const newUser = await User.create({
      idUser: 'user123',
      email: 'testuser@example.com',
      password: 'password',
      username: 'testuser',
      role: 'admin',
    });

    console.log('User created:', newUser.toJSON());

    // Membuat instance Mahasiswa terkait dengan User
    const newMahasiswa = await Mahasiswa.create({
      idmahasiswa: 'mahasiswa123',
      idUser: newUser.idUser,
      nama: 'Mahasiswa 1',
      nim: 'NIM123',
      gender: 'Male',
    });

    console.log('Mahasiswa created:', newMahasiswa.toJSON());

    // Mengambil User dan termasuk Mahasiswas terkait
    const userWithMahasiswas = await User.findOne({
      where: { idUser: newUser.idUser },
      include: [{ model: Mahasiswa, as: 'mahasiswas' }],
    });

    console.log('User with Mahasiswas:', JSON.stringify(userWithMahasiswas, null, 2));

    // Mengambil Mahasiswa dan termasuk User terkait
    const mahasiswaWithUser = await Mahasiswa.findOne({
      where: { idmahasiswa: newMahasiswa.idmahasiswa },
      include: [{ model: User, as: 'user' }],
    });

    console.log('Mahasiswa with User:', JSON.stringify(mahasiswaWithUser, null, 2));

  } catch (error) {
    console.error('Error testing associations:', error);
  } finally {
    await sequelize.close();
  }
}

testAssociations();
