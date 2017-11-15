var express = require('express')
var session = require('express-session')
var path = require('path')
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken')


var r_auth = require('./auth')
var r_job = require('./job')
var r_api = require('./api')

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

var authCheck = function(req, res, next) {
    if (req.session.logged) {
        next()
    } else {
        res.redirect('/auth')
    }
}

app.use('/job', authCheck, r_job)

var tokenCheck = function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        jwt.verify(token, 'secret', function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Invalid or Expired token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        // if there is no token        
        return res.status(403).send({ success: false, message: 'No token' });
    }
}

app.use('/api', tokenCheck, r_api)

app.listen(80)