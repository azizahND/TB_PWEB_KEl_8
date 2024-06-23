const bcrypt = require('bcrypt');


exports.renderGantiPassword = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); 
    }
    res.render('gantiPassword');
};


exports.ubahPassword = async (req, res) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (!req.session.user) {
        return res.status(401).send('Anda harus login untuk mengganti password.');
    }

    
    const user = req.session.user;

    
    if (newPassword !== confirmNewPassword) {
        return res.status(400).send('Konfirmasi password baru tidak cocok.');
    }

    try {
        
        const match = await bcrypt.compare(currentPassword, user.password);
        if (!match) {
            return res.status(400).send('Password saat ini tidak valid.');
        }

        
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        
        
        req.session.user.password = hashedNewPassword;

        res.send('Password berhasil diganti.');
    } catch (error) {
        res.status(500).send('Terjadi kesalahan: ' + error.message);
    }
};