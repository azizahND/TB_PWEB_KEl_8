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

        res.render('dashboard-m', { evaluasiJawaban });
    } catch (error) {
        console.error('Error fetching evaluation results:', error);
        res.status(500).json({ error: 'Failed to fetch evaluation results' });
    }
}


module.exports = {
    getMahasiswaEvaluasi,
    // Export fungsi lain jika ada
};