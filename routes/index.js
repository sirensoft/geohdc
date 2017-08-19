var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var config = require('../config/config-main');

var conn_gis_str = require('../config/connect-gis');
var con_gis = mysql.createConnection(conn_gis_str);


/* GET home page. */
router.get('/', function(req, res) {

    var sql = "replace into sys_area (areacode) values (?)"
    con_gis.query(sql, [config.areacode], (err) => {
        if (err) throw err;
        res.render('index', { areaname: config.areaname });
    });




});

router.get('/about', (req, res) => {
    res.render('about')
});

module.exports = router;