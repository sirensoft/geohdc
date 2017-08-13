var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', (req, res) => {
    res.render('login');
});

module.exports = router;