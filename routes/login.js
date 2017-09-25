var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var md5 = require('md5');
var db_config = require('../config/connect-gis');

var knex = require('knex')({
    client: 'mysql',
    connection: db_config
});

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res, next) => {
    knex('sys_admin').where({
            username: req.body.username,
            password: md5(req.body.password)
        }).count('username as ok')
        .then((raw) => {
            //console.log(raw[0].ok * 1);
            if (raw[0].ok * 1 > 0) {

                req.session.user = req.body.username;
                res.redirect('/');
                return;
            }
            res.redirect('/login');
        });

});
router.get('/logout', (req, res) => {

    req.session.destroy();

    res.redirect('/index');
});

module.exports = router;