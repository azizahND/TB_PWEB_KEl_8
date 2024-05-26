const bcrypt = require('bcrypt');
const { User } = require('../models'); // Ganti 'User' dengan nama model yang sesuai dengan struktur data pengguna Anda
const { isAuthenticated } = require('../middlewares/auth'); // Import middleware yang telah Anda definisikan sebelumnya

// Controller untuk proses login
async function login(req, res) {
    const { username, password } = req.body;

    try {
        // Cari pengguna berdasarkan nama pengguna (username)
        const user = await User.findOne({ where: { username: username } });

        // Jika pengguna tidak ditemukan, kirim respons dengan pesan kesalahan
        if (!user) {
            return res.status(401).send('Username or password is incorrect.');
        }

        // Bandingkan password yang dimasukkan dengan password yang disimpan di database menggunakan bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Jika password tidak valid, kirim respons dengan pesan kesalahan
        if (!isPasswordValid) {
            return res.status(401).send('Username or password is incorrect.');
        }

        // Jika autentikasi berhasil, atur objek pengguna dalam sesi
        req.session.user = {
            id: user.id,
            username: user.username,
            role: user.role // Anggap bahwa role disimpan di dalam kolom 'role' di tabel pengguna
        };

        // Redirect pengguna ke halaman dashboard
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
}

// Contoh route untuk proses login
app.post('/login', login);

module.exports = {
    login
};
