var express = require('express')
var session = require('express-session')
var path = require('path')
var bodyParser = require('body-parser')
var r_auth = require('./auth')
var r_job = require('./job')

var app = new express()

app.set('views', path.join(__dirname, 'html'));
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'superkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(function(req, res, next) {
    res.locals.session = req.session
    next();
})
app.use('/auth', r_auth)

var auth_check = function(req, res, next) {
    if (req.session.logged) {
        next()
    } else {
        res.redirect('/auth')
    }
}
app.use('/', auth_check, r_job)

app.listen(80)