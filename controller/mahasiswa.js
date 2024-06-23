const { jawabanEvaluasi, mahasiswa, DetailJawabanEvaluasi, pertanyaan, User, feedback } = require('../models');
const multer = require('multer')
const path = require('path')
const { Op } = require('sequelize');
const Sequelize = require('sequelize');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../', 'public', 'images'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


const upload = multer({
    storage: storage,
});
const uploadd = upload.single('file')

const postEvaluasi = async (req, res) => {
    const emailMahasiswa = req.session.user.email;
    try {
        const { answer, questions } = req.body
        const file_uploaded = req.file

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

        const jwbEvaluasi = await jawabanEvaluasi.findOne({
            where: { idMahasiswa: idMahasiswa },
        });


        if (questions.length > 0) {
            for (let i = 0; i < questions.length; i++) {
                const answerValue = answer[i];
                const questionValue = questions[i];
                let createData = {
                    idPertanyaan: questionValue,
                    jawaban: answerValue,
                    idJawabanEvaluasi: jwbEvaluasi.id,
                    picture: null,
                };

                // Jika file diunggah, tambahkan properti file ke dalam objek pembaruan
                if (file_uploaded && i === (questions.length - 1)) {
                    createData.picture = file_uploaded.originalname;
                }
                await DetailJawabanEvaluasi.create(createData);


            }
        }


        return res.redirect('/mahasiswa/dashboard');
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Kesalahan Server' })
    }
}

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


async function getFormEvaluasi(req, res) {
    const idJawabanEvaluasi = req.params.id; // Dapatkan ID jawaban evaluasi dari parameter URL

    try {
        // Dapatkan data detail jawaban evaluasi berdasarkan idJawabanEvaluasi
        const evaluasiJawaban = await pertanyaan.findAll({

        });


        // Render halaman EJS dengan data yang diambil
        res.render('formEvaluasi', { evaluasiJawaban });
    } catch (error) {
        console.error('Error fetching evaluation results:', error);
        res.status(500).json({ error: 'Failed to fetch evaluation results' });
    }
}



async function getMahasiswaFeedback(req, res) {
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
                    required: true, 
                    include: [
                        {
                            model: pertanyaan,
                            as: 'pertanyaan',
                        },

                        {
                            model: feedback,
                            as: 'feedback',

                        },
                    ]
                }
            ],
            having: Sequelize.literal('COUNT(detailJawabanEvaluasi.id) > 0'),
            group: ['detailJawabanEvaluasi.id'],
        });

        res.render('dashboard-f', { evaluasiJawaban, mahasiswaa });
        //res.status(200).json({ error: 'Failed to fetch evaluation results', data: { evaluasiJawaban } });
    } catch (error) {
        console.error('Error fetching evaluation results:', error);
        res.status(500).json({ error: 'Failed to fetch evaluation results' });
    }
}


module.exports = {
    getMahasiswaEvaluasi,
    showProfile,
    getFormEvaluasi,
    postEvaluasi,
    uploadd,
    getMahasiswaFeedback,
    // Export fungsi lain jika ada
};