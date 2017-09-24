var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res, next) => {
    if (req.body.username === 'admin' && req.body.password === '123') {
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