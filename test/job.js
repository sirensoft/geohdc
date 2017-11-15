var express = require('express')
var router = express.Router();
var user = require('./models/user')
var mUser = new user();

router.get('/', function(req, res) {
    res.send('First page for...' + req.session.username)
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