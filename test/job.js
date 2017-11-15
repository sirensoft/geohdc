var express = require('express')
var router = express.Router();
var user = require('./models/user')
var mUser = new user();

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

router.get('/person3', async(req, res) => {
    var rows = await mUser.list();
    res.status(200).json(rows[0])
})

module.exports = router