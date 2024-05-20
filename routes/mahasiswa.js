var express = require('express');
var router = express.Router();

router.get('/profileMahasiswa',  function(req, res, next) {
  res.render('profile-m'); 
});


router.get('/ubahPassword',  function(req, res, next) {
  res.render('ganti-password'); 
});

module.exports = router;





