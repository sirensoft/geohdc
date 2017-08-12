var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var conn_str = require('../config/connect-hdc');
var conn = mysql.createConnection(conn_str);

router.get('/', (req, res) => {
    conn.connect((err) => {
        if (err) throw err;
    });
    res.send('test - ok');
});

module.exports = router;