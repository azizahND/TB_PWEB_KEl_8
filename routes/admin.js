var express = require('express');
var router = express.Router();
const app = express();

const { isAuthenticated, isAdmin } = require('../middlewares/auth'); // Sesuaikan path jika diperlukan

router.get('/profileAdmin',  function(req, res, next) {
  res.render('profile-d'); 
});

router.get('/admin', isAuthenticated, isAdmin, (req, res) => {
  res.send('Welcome to the admin page.');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/ubahPassword', (req, res) => {
  res.render('gantiPassword');
});

module.exports=router;