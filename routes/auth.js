var express = require('express');
var router = express.Router();
const loginController = require('../controller/loginController');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', loginController.login);





module.exports = router;
