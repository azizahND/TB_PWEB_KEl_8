var express = require('express');
const app = express();
var router = express.Router();
const { isAuthenticated, isMahasiswa } = require('../middlewares/auth'); // Sesuaikan path jika diperlukan
router.get('/profileMahasiswa',  function(req, res, next) {
  res.render('profile-m'); 
});

router.get('/mahasiswa', isAuthenticated, isMahasiswa, (req, res) => {
  res.send('Welcome to the mahasiswa page.');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/ubahPassword', (req, res) => {
  res.render('gantiPassword');
});


module.exports=router;




