var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var md5 = require('md5');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res, next) => {
    if (req.body.username === 'admin' && md5(req.body.password) === 'ad8680d710ff3257bbf9fd240a7dd9b3') {
        req.session.user = 'admin';
        res.redirect('/');
        return;
    }
    res.redirect('/login');
});
router.get('/logout', (req, res) => {

    req.session.destroy();

    res.redirect('/index');
});

module.exports = router;