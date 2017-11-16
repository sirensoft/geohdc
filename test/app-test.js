var express = require('express')
var session = require('express-session')
var path = require('path')
var bodyParser = require('body-parser')

var app = new express()

app.set('views', path.join(__dirname, 'html'));
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
app.get('/', (req, res) => {
    res.redirect('/job')
})



app.use('/auth', require('./controllers/auth'))
app.use('/job', require('./controllers/job'))
app.use('/api', require('./controllers/api'))



app.listen(80)