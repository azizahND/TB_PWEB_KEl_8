var express = require('express');
var router = express.Router();
const { login } = require('../controller/login');

router.post('/login', login);

router.get('/login', (req, res) => {
    res.render('login');
});




module.exports = router;
