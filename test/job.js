var express = require('express')
var router = express.Router();

router.get('/', function(req, res) {
    res.send('First page for...' + req.session.username)
})

router.get('/person', function(req, res) {
    let persons = [{ name: 'aaaaaa', age: 26 }, { name: 'bbbbb', age: 20 }]
    res.render('person', { persons: persons })
})

module.exports = router