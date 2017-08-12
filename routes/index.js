var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var conn_hdc_str = require('../config/connect-hdc');
var con_hdc = mysql.createConnection(conn_hdc_str);


/* GET home page. */
router.get('/', function(req, res) {
    var sql = " SELECT c.changwatname province FROM sys_config t ";
    sql += " INNER JOIN cchangwat c on c.changwatcode = t.provincecode";
    con_hdc.query(sql, (err, result, feilds) => {
        if (err) throw err;
        var province = [];
        result.forEach(function(row) {
            province.push(row.province);
        });
        res.render('index', { province: province[0] });
    })

});

module.exports = router;