var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var config = require('../config/config-main');



/* GET home page. */
router.get('/', function(req, res) {

    res.render('index', { province: config.provname });


});

router.get('/about', (req, res) => {
    res.render('about')
});

module.exports = router;