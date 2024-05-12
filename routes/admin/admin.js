var express = require('express');
var router = express.Router();
router.get('/profileAdmin',  function(req, res, next) {
  res.render('profile-d'); 
});


module.exports = router;