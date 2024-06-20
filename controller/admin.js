const { jawabanEvaluasi, mahasiswa, DetailJawabanEvaluasi, pertanyaan } = require('../models');

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
    // Redirect to the login page
    return res.redirect('/login');
  });
}

async function generatedExcel(req, res) {
  try {
      // Mengambil data evaluasi dari database dengan relasi ke tabel mahasiswa dan pertanyaan
      const evaluasiJawaban = await jawabanEvaluasi.findAll({
          include: [
              { model: mahasiswa, attributes: ['nama', 'nim'] },
              { model: pertanyaan, attributes: ['pertanyaan'] }
          ]
      });

      // Membuat workbook dan worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Evaluasi Jawaban');

      // Menambahkan header ke worksheet
      worksheet.columns = [
          { header: 'ID', key: 'id', width: 10 },
          { header: 'ID Pertanyaan', key: 'idPertanyaan', width: 15 },
          { header: 'Pertanyaan', key: 'pertanyaan', width: 50 },
          { header: 'ID Mahasiswa', key: 'idMahasiswa', width: 15 },
          { header: 'Nama Mahasiswa', key: 'namaMahasiswa', width: 30 },
          { header: 'NIM', key: 'nimMahasiswa', width: 15 },
          { header: 'Jawaban', key: 'jawaban', width: 50 },
          { header: 'Tanggal', key: 'tanggal', width: 15, style: { numFmt: 'dd/mm/yyyy' } }
      ];

      // Menambahkan data ke worksheet
      evaluasiJawaban.forEach(evaluasi => {
          worksheet.addRow({
              id: evaluasi.id,
              idPertanyaan: evaluasi.idPertanyaan,
              pertanyaan: evaluasi.pertanyaan.pertanyaan,
              idMahasiswa: evaluasi.idMahasiswa,
              namaMahasiswa: evaluasi.mahasiswa.nama,
              nimMahasiswa: evaluasi.mahasiswa.nim,
              jawaban: evaluasi.jawaban,
              tanggal: new Date(evaluasi.tanggal)
          });
      });

      // Menuliskan workbook ke buffer
      const buffer = await workbook.xlsx.writeBuffer();

      // Mengirimkan buffer sebagai file Excel
      res.set({
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': 'attachment; filename=evaluasi-jawaban.xlsx'
      });

      res.send(buffer);
  } catch (error) {
      console.error('Error generating Excel:', error);
      res.status(500).json({ error: 'Failed to generate Excel file' });
  }
}



async function getEvaluasiResults(req, res) {
  const idJawabanEvaluasi = req.params.id; // Dapatkan ID jawaban evaluasi dari parameter URL

  try {
      // Dapatkan data detail jawaban evaluasi berdasarkan idJawabanEvaluasi
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
              }
          ]
      });

      if (!evaluasiJawaban || evaluasiJawaban.length === 0) {
          return res.status(404).json({ error: 'Data evaluasi tidak ditemukan' });
      }

      // Render halaman EJS dengan data yang diambil
      res.render('hasilEvaluasi', { evaluasiJawaban });
  } catch (error) {
      console.error('Error fetching evaluation results:', error);
      res.status(500).json({ error: 'Failed to fetch evaluation results' });
  }
}



async function getEvaluasiData(req, res) {
  try {
    const evaluasiJawaban = await DetailJawabanEvaluasi.findAll({
      include: [
        { model: pertanyaan, as: 'pertanyaan', attributes: ['pertanyaan'] }
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

    res.json(data);
  } catch (error) {
    console.error('Error fetching evaluation results:', error);
    res.status(500).json({ error: 'Failed to fetch evaluation results' });
  }
}


async function deleteJawabanEvaluasi(req, res) {
  const id = req.params.id; // Dapatkan ID dari parameter URL
  
  try {
  // Hapus detail jawaban evaluasi yang terkait
  await DetailJawabanEvaluasi.destroy({
  where: { idJawabanEvaluasi: id }
  });
  

    // Hapus jawaban evaluasi
    await jawabanEvaluasi.destroy({
        where: { id: id }
    });
  
    res.status(200).json({ message: 'Jawaban evaluasi berhasil dihapus' });
  } catch (error) {
  console.error('Error deleting evaluation result:', error);
  res.status(500).json({ error: 'Failed to delete evaluation result' });
  }
  }

module.exports = {
  getDashboard,
  renderDashboard,
  logout,
  generatedExcel,
  getEvaluasiData,
  getEvaluasiResults,
  deleteJawabanEvaluasi
};
