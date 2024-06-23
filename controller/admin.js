const { where } = require('sequelize');
const { jawabanEvaluasi, mahasiswa, DetailJawabanEvaluasi, pertanyaan, User, admin, feedback } = require('../models');
const ExcelJS = require('exceljs');

async function getDashboard(req, res, next) {
  try {


    const dataEvaluasi = await jawabanEvaluasi.findAll({
      include: [
        {
          model: mahasiswa,
          as: 'mahasiswa'
        },
        {
          model: DetailJawabanEvaluasi,
          as: 'detailJawabanEvaluasi',
          include: [
            {
              model: pertanyaan,
              as: 'pertanyaan'
            }
          ]
        }
      ],
      attributes: ['id', 'idMahasiswa', 'createdAt', 'updatedAt'], // Kolom-kolom yang ada di tabel jawabanEvaluasi
    });

    console.log('Data Evaluasi:', dataEvaluasi); // Tambahkan logging
    res.render('dasboard', { dataEvaluasi });
  } catch (error) {
    next(error);
  }
}



function renderDashboard(req, res) {
  if (req.session.user && req.session.user.role === 'admin') {
    res.render('dasboard'); // Pastikan Anda memiliki file `dashboard.ejs`
  } else {
    res.status(403).send('Access denied. Admins only.');
  }
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error ketika logout:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    
    return res.redirect('/login');
  });
}

async function generateExcel(req, res) {
  try {
    
    const evaluasiDetailJawaban = await DetailJawabanEvaluasi.findAll({
      include: [
        {
          model: jawabanEvaluasi,
          as: 'jawabanEvaluasi',
          include: {
            model: mahasiswa,
            as: 'mahasiswa',
            attributes: ['nama', 'nim']
          }
        },
        {
          model: pertanyaan,
          as: 'pertanyaan',
          attributes: ['pertanyaan']
        }
      ]
    });

    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Detail Evaluasi Jawaban');

    
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'ID Pertanyaan', key: 'idPertanyaan', width: 15 },
      { header: 'Pertanyaan', key: 'pertanyaan', width: 50 },
      { header: 'ID Jawaban Evaluasi', key: 'idJawabanEvaluasi', width: 20 },
      { header: 'ID Mahasiswa', key: 'idMahasiswa', width: 15 },
      { header: 'Nama Mahasiswa', key: 'namaMahasiswa', width: 30 },
      { header: 'NIM', key: 'nimMahasiswa', width: 15 },
      { header: 'Jawaban', key: 'jawaban', width: 50 },
      { header: 'Tanggal', key: 'tanggal', width: 15, style: { numFmt: 'dd/mm/yyyy' } }
    ];

    
    evaluasiDetailJawaban.forEach(detail => {
      worksheet.addRow({
        id: detail.id,
        idPertanyaan: detail.pertanyaan.id,
        pertanyaan: detail.pertanyaan.pertanyaan,
        idJawabanEvaluasi: detail.jawabanEvaluasi.id,
        idMahasiswa: detail.jawabanEvaluasi.mahasiswa.id,
        namaMahasiswa: detail.jawabanEvaluasi.mahasiswa.nama,
        nimMahasiswa: detail.jawabanEvaluasi.mahasiswa.nim,
        jawaban: detail.jawaban,
        tanggal: new Date(detail.createdAt)
      });
    });

    
    const buffer = await workbook.xlsx.writeBuffer();

    
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=detail-evaluasi-jawaban.xlsx'
    });

    res.send(buffer);
  } catch (error) {
    console.error('Error generating Excel:', error);
    res.status(500).json({ error: 'Failed to generate Excel file' });
  }
}




async function getEvaluasiResults(req, res) {
  const idJawabanEvaluasi = req.params.id; 
  try {
    
    const evaluasiJawaban = await DetailJawabanEvaluasi.findAll({
      where: { idJawabanEvaluasi: idJawabanEvaluasi },
      include: [
        {
          model: jawabanEvaluasi,
          as: 'jawabanEvaluasi',
          attributes: ['id'],
          include: [
            {
              model: mahasiswa,
              as: 'mahasiswa',
              attributes: ['nama', 'nim']
            }
          ]
        },
        {
          model: pertanyaan,
          as: 'pertanyaan',
          attributes: ['pertanyaan']
        },
        {
          model: feedback,
          as: 'feedback'
        }
      ],
      group: ['id']
    });

    if (!evaluasiJawaban || evaluasiJawaban.length === 0) {
      return res.status(404).json({ error: 'Data evaluasi tidak ditemukan' });
    }

    
    res.render('hasilEvaluasi', { evaluasiJawaban });
    
  } catch (error) {
    console.error('Error fetching evaluation results:', error);
    res.status(500).json({ error: 'Failed to fetch evaluation results' });
  }
}



async function getEvaluasiData(req, res) {
  try {
   
    const questionIds = [1, 2, 3]; 

    const evaluasiJawaban = await DetailJawabanEvaluasi.findAll({
      include: [
        {
          model: pertanyaan,
          as: 'pertanyaan',
          attributes: ['id', 'pertanyaan'],
          where: {
            id: questionIds  
          }
        }
      ]
    });

    const data = {};
    evaluasiJawaban.forEach(evaluasi => {
      const question = evaluasi.pertanyaan.pertanyaan;
      const answer = evaluasi.jawaban;

      if (!data[question]) {
        data[question] = {};
      }

      if (!data[question][answer]) {
        data[question][answer] = 0;
      }

      data[question][answer]++;
    });

    
    const allAnswers = [1, 2, 3, 4, 5]; 
    Object.keys(data).forEach(question => {
      allAnswers.forEach(answer => {
        if (!data[question][answer]) {
          data[question][answer] = 0;
        }
      });
    });

    res.json(data);
  } catch (error) {
    console.error('Error fetching evaluation results:', error);
    res.status(500).json({ error: 'Failed to fetch evaluation results' });
  }
}


async function deleteJawabanEvaluasi(req, res) {
  const id = req.params.id; 
  try {
    
    await DetailJawabanEvaluasi.destroy({
      where: { idJawabanEvaluasi: id }
    });


   
    await jawabanEvaluasi.destroy({
      where: { id: id }
    });

    res.status(200).json({ message: 'Jawaban evaluasi berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting evaluation result:', error);
    res.status(500).json({ error: 'Failed to delete evaluation result' });
  }
}


async function showAdminProfile(req, res) {
  const emailAdmin = req.session.user.email; 

  try {
    
    const userData = await User.findOne({
      where: { email: emailAdmin },
      attributes: ['id', 'email', 'username']
    });

    if (!userData) {
      return res.status(404).json({ error: 'User tidak ditemukan' });
    }

    
    const adminData = await admin.findOne({
      where: { idUser: userData.id },
      include: {
        model: User,
        as: 'user',
        attributes: ['email', 'username']
      }
    });

    if (!adminData) {
      return res.status(404).json({ error: 'Admin tidak ditemukan' });
    }

    res.render('profile-d', { adminData });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
}

const postFeedback = async (req, res) => {
  const emailAdmin = req.session.user.email;
  try {
    const { feedback_text, id_djwb } = req.body
    const file_uploaded = req.file

    const userData = await User.findOne({
      where: { email: emailAdmin },
      attributes: ['id', 'email', 'username']
    });

    if (!userData) {
      return res.status(404).json({ error: 'User tidak ditemukan' });
    }

    const feedback1 = await feedback.findOne({
      where: { idDetailJawaban: id_djwb },

    });

    let createData = {
      idDetailJawaban: id_djwb,
      feedback: feedback_text,
      idAdmin: userData.id,
    };

    
    if (file_uploaded) {
      createData.picture = file_uploaded.originalname;
    }
    if (!feedback1) {
      await feedback.create(createData);
    } else {
      if (feedback_text) {
        await feedback.update(
          createData , { where: { idDetailJawaban: id_djwb } }
        );
      } else {
        await feedback.destroy({
          where: { idDetailJawaban: id_djwb }
        });
      }

    }


    return res.redirect(req.get('Referer'));
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: 'Kesalahan Server' })
  }
}


const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await feedback.findAll({
        include: [
            {
                model: DetailJawabanEvaluasi,
                as: 'detailJawabanEvaluasi',
                include: [
                    {
                        model: jawabanEvaluasi,
                        as: 'jawabanEvaluasi',
                        include: [
                            {
                                model: mahasiswa,
                                as: 'mahasiswa',
                                include: [
                                    {
                                        model: User,
                                        as: 'user'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: pertanyaan,
                        as: 'pertanyaan'
                    }
                ]
            }
        ]
    });

    res.render('adminFeedback', { feedbacks });
} catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).send('Internal Server Error');
}
};


module.exports = {
  getDashboard,
  renderDashboard,
  logout,
  generateExcel,
  getEvaluasiData,
  getEvaluasiResults,
  deleteJawabanEvaluasi,
  showAdminProfile,
  postFeedback,
  getAllFeedbacks
};
