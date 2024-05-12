var express = require('express');
var router = express.Router();
router.get('/profileMahasiswa',  function(req, res, next) {
  res.render('profile-m'); 
});


module.exports = router;