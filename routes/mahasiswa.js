var express = require('express');
const app = express();
var router = express.Router();
const { isAuthenticated, isMahasiswa } = require('../middlewares/auth'); // Sesuaikan path jika diperlukan
const mahasiswaController = require('../controller/mahasiswa');

router.get('/dashboard', isAuthenticated, isMahasiswa, mahasiswaController.getMahasiswaEvaluasi);
router.get('/feedback', isAuthenticated, isMahasiswa, mahasiswaController.getMahasiswaFeedback);
router.get('/profil', isAuthenticated, isMahasiswa, mahasiswaController.showProfile);




router.get('/login', (req, res) => {
  res.render('login');
});



router.get('/ubahPassword' ,  function(req, res, next) {
  res.render('ganti-password'); 
});

router.get('/formEvaluasi', isAuthenticated, mahasiswaController.getFormEvaluasi);
router.post('/formEvaluasi', mahasiswaController.uploadd, mahasiswaController.postEvaluasi);

module.exports=router;



