var express = require('express');
var router = express.Router();
const adminController = require('../controller/admin');
const { isAuthenticated, isAdmin } = require('../middlewares/auth'); // Sesuaikan path jika diperlukan

// Rute untuk dashboard admin

// Rute untuk dashboard admin
router.get('/dashboard', isAuthenticated, isAdmin, adminController.getDashboard);


router.get('/dash',  function(req, res, next) {
  res.render('dashboard1'); 
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









module.exports=router;