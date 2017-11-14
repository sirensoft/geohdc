var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('login')
})
router.post('/', function(req, res) {
    if (req.body.username.trim()) {
        req.session.logged = true
        req.session.username = req.body.username
        res.redirect('/')
    } else {
        res.redirect('/login')
    }

})

router.get('/logout', function(req, res) {
    req.session.destroy()
    res.send('Log Out...ok')
})



module.exports = router