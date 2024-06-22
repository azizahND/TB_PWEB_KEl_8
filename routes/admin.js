var express = require('express');
var router = express.Router();
const adminController = require('../controller/admin');
const { isAuthenticated, isAdmin } = require('../middlewares/auth'); // Sesuaikan path jika diperlukan
const { jawabanEvaluasi } = require('../models');

// Rute untuk dashboard admin

// Rute untuk dashboard admin
router.get('/dashboard', isAuthenticated, isAdmin, adminController.getDashboard);

router.get('/dashboard/data', isAuthenticated, isAdmin, adminController.getEvaluasiData);

router.get('/hasilEvaluasi/:id', isAuthenticated, isAdmin, adminController.getEvaluasiResults);

router.get('/profil', isAuthenticated, isAdmin, adminController.showAdminProfile);

router.get('/dashboard/excel', isAuthenticated, isAdmin, adminController.generateExcel);

router.delete('/dashboard/:id', isAuthenticated, isAdmin, adminController.deleteJawabanEvaluasi);


router.get('/dash',  function(req, res, next) {
  res.render('dashboard1'); 
});

router.get('/feedback',  function(req, res, next) {
  res.render('feedback'); 
});



router.get('/profileAdmin',  function(req, res, next) {
  res.render('profile-d'); 
});

router.get('/admin', isAuthenticated, isAdmin, (req, res) => {
  res.send('Welcome to the admin page.');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/ubahPassword',  function(req, res, next) {
  res.render('gantiPassword'); 
});

router.get('/hasil', (req, res) => {
  res.render('hasilEvaluasi');
});



router.delete('/dashboard/:id', async (req, res) => {
  try {
    console.log(`Menghapus data dengan ID: ${req.params.id}`);
    const result = await jawabanEvaluasi.destroy({
      where: {
        id: req.params.id
      }
    });
    
    if (result) {
      res.status(200).send({ message: 'Data berhasil dihapus' });
    } else {
      res.status(404).send({ message: 'Data tidak ditemukan' });
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).send({ message: 'Terjadi kesalahan', error });
  }
});







module.exports=router;