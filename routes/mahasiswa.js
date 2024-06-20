var express = require('express');
const app = express();
var router = express.Router();
const { isAuthenticated, isMahasiswa } = require('../middlewares/auth'); // Sesuaikan path jika diperlukan
const mahasiswaController = require('../controller/mahasiswa');

router.get('/dashboard', isAuthenticated, isMahasiswa, mahasiswaController.getMahasiswaEvaluasi);
router.get('/profil', isAuthenticated, isMahasiswa, mahasiswaController.showProfile);



router.get('/profileMahasiswa',  function(req, res, next) {
  res.render('profile-m'); 
});

router.get('/mahasiswa', isAuthenticated, isMahasiswa, (req, res) => {
  res.send('Welcome to the mahasiswa page.');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/hasil', (req, res) => {
  res.render('hasilEvaluasi');
});



router.get('/dashboard', isAuthenticated, isMahasiswa, (req, res) => {
  res.render('dashboard-m', { user: req.session.user });
});


router.get('/ubahPassword' ,  function(req, res, next) {
  res.render('ganti-password'); 
});


module.exports=router;



