var express = require('express');
var router = express.Router();
const  isLogin = require('../middlewares/auth'); 


router.get('login',isLogin, controller.login);






router.post('/logout',verifyToken,controller.logout);
module.exports = router;