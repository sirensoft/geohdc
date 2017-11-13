var express = require('express');
var router = express.Router();


var config = require('../config/config-main');



/* GET home page. */
router.get('/', function(req, res) {
    res.redirect('/index');
});
router.get('/index', function(req, res, next) {
    var con_gis_db = req.con_gis_db;

    var sql = "replace into sys_area (areacode) values (?)"
    con_gis_db.query(sql, [config.areacode], (err) => {
        if (err) throw err;
        req.session.config = config;
        res.render('index', { session: req.session });
    });




});

router.get('/about', (req, res) => {
    res.render('about', { session: req.session })
});

module.exports = router;