var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res, next) => {
    if (req.body.username === 'admin') {
        res.redirect('/');
        return;
    }
    res.redirect('/login');
});

module.exports = router;