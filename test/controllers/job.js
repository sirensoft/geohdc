var express = require('express')
var router = express.Router();
var user = new require('../models/user')
var mUser = new user();

var authCheck = require('../modules/authcheck')

router.use(authCheck)

router.get('/', function(req, res) {
    res.render('index')
})

router.get('/person', async function(req, res) {
    let rows = await mUser.list()
    res.render('person', { persons: rows[0] })
})


router.get('/person2', (req, res) => {
    mUser.list().then(function(rows) {
        res.render('person', { persons: rows[0] });
    })
})


module.exports = router