var express = require('express')
var session = require('express-session')
var path = require('path')
var bodyParser = require('body-parser')

var app = new express()

app.set('views', path.join(__dirname, 'login'));
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'superkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


app.get('/login', function(req, res) {
    res.render('login')
})
app.post('/login', function(req, res) {
    if (req.body.username.trim()) {
        req.session.logged = true
        req.session.username = req.body.username
        res.redirect('/')
    } else {
        res.redirect('/login')
    }

})

app.get('/logout', function(req, res) {
    req.session.destroy()
    res.send('Log Out...ok')
})
var auth = function(req, res, next) {
    if (req.session.logged) {
        next()
    } else {
        res.redirect('/login')
    }
}

app.use(auth)

app.get('/', function(req, res) {
    res.send('First page for...' + req.session.username)
})

app.get('/person', function(req, res) {
    let persons = [{ name: 'aaaaaa', age: 26 }, { name: 'bbbbb', age: 20 }]
    res.render('person', { persons: persons })
})

app.listen(88)