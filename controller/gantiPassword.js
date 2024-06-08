const bcrypt = require('bcrypt');

// Render halaman ganti password
exports.renderGantiPassword = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); // Redirect jika user tidak login
    }
    res.render('gantiPassword');
};

// Proses ganti password
exports.ubahPassword = async (req, res) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (!req.session.user) {
        return res.status(401).send('Anda harus login untuk mengganti password.');
    }

    // Ambil data user dari session
    const user = req.session.user;

    // Validasi password
    if (newPassword !== confirmNewPassword) {
        return res.status(400).send('Konfirmasi password baru tidak cocok.');
    }

    try {
        // Validasi password saat ini
        const match = await bcrypt.compare(currentPassword, user.password);
        if (!match) {
            return res.status(400).send('Password saat ini tidak valid.');
        }

        // Hash password baru
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update password di database
        // Implementasikan sesuai dengan database Anda
        // Misal menggunakan model User
        // await User.updateOne({ _id: user._id }, { password: hashedNewPassword });

        // Update password di session (jika perlu)
        req.session.user.password = hashedNewPassword;

        res.send('Password berhasil diganti.');
    } catch (error) {
        res.status(500).send('Terjadi kesalahan: ' + error.message);
    }
};