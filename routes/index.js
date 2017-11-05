var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var config = require('../config/config-main');

var conn_gis_str = require('../config/connect-gis');
var con_gis = mysql.createPool(conn_gis_str);


/* GET home page. */
router.get('/', function(req, res) {
    res.redirect('/index');
});
router.get('/index', function(req, res) {

    var sql = "replace into sys_area (areacode) values (?)"
    con_gis.query(sql, [config.areacode], (err) => {
        if (err) throw err;
        req.session.config = config;
        res.render('index', { session: req.session });
    });




});

router.get('/about', (req, res) => {
    res.render('about', { session: req.session })
});

module.exports = router;