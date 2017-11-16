var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')

router.get('/', function(req, res) {
    res.render('login')
})
router.post('/', function(req, res) {
    if (req.body.username.trim()) {
        req.session.logged = true
        req.session.username = req.body.username
        var token = jwt.sign({ data: req.body.username }, 'secret', { expiresIn: 60 })
        console.log(token)
        res.redirect('/job')
    } else {
        res.redirect('/auth')
    }

})

router.get('/logout', function(req, res) {
    req.session.destroy()
    res.redirect('/auth');
})



module.exports = router