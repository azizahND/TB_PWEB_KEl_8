const { jawabanEvaluasi, mahasiswa, DetailJawabanEvaluasi, pertanyaan, User} = require('../models');


async function getMahasiswaEvaluasi(req, res) {
    const emailMahasiswa = req.session.user.email; // Dapatkan email mahasiswa dari sesi

    try {
        // Cari ID mahasiswa berdasarkan email dari tabel User
        const mahasiswaa = await mahasiswa.findOne({
            include: [
                {
                    model: User,
                    as: 'user',
                    where: { email: emailMahasiswa },
                    attributes: []
                }
            ]
        });

        if (!mahasiswaa) {
            return res.status(404).json({ error: 'Mahasiswa tidak ditemukan' });
        }

        const idMahasiswa = mahasiswaa.id;

        // Mengambil data jawaban evaluasi beserta detailnya
        const evaluasiJawaban = await jawabanEvaluasi.findAll({
            where: { idMahasiswa: idMahasiswa },
            include: [
                {
                    model: DetailJawabanEvaluasi,
                    as: 'detailJawabanEvaluasi',
                    include: [
                        {
                            model: pertanyaan,
                            as: 'pertanyaan',
                            attributes: ['pertanyaan']
                        }
                    ]
                }
            ]
        });

        res.render('dashboard-m', { evaluasiJawaban, mahasiswaa });
    } catch (error) {
        console.error('Error fetching evaluation results:', error);
        res.status(500).json({ error: 'Failed to fetch evaluation results' });
    }
}


async function showProfile(req, res) {
    const emailMahasiswa = req.session.user.email; // Get the email of the logged-in user

    try {
        // Find the user based on the email
        const userData = await User.findOne({
            where: { email: emailMahasiswa },
            attributes: ['id', 'email', 'username']
        });

        if (!userData) {
            return res.status(404).json({ error: 'User tidak ditemukan' });
        }

        // Find mahasiswa based on the user's id
        const mahasiswaData = await mahasiswa.findOne({
            where: { idUser: userData.id },
            include: {
                model: User,
                as: 'user',
                attributes: ['email', 'username']
            }
        });

        if (!mahasiswaData) {
            return res.status(404).json({ error: 'Mahasiswa tidak ditemukan' });
        }

        res.render('profile-m', { mahasiswa: mahasiswaData });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
}
  

module.exports = {
    getMahasiswaEvaluasi,
    showProfile
    // Export fungsi lain jika ada
};