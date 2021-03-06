var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');


var r_test = require('./routes/test');
var r_index = require('./routes/index');
var r_users = require('./routes/users');
var r_layers = require('./routes/layers');
var r_login = require('./routes/login');
var r_pop = require('./routes/pop');

var app = express();
app.use(session({
    secret: 'UTEHN_JADYANGTONE',
    resave: false,
    saveUninitialized: true,
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: null }
}));

// view engine setup

app.set('views', path.join(__dirname, 'views'));
//app.engine('.ejs', ejs.renderFile);
app.set('view engine', 'ejs');

var con_gis_str = require('./config/connect-gis');
var con_gis_db = mysql.createPool(con_gis_str);
app.use(function(req, res, next) {
    req.con_gis_db = con_gis_db;
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/test', r_test);
app.use('/', r_index);
app.use('/users', r_users);
app.use('/layers', r_layers);
app.use('/login', r_login);
app.use('/pop', r_pop);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



module.exports = app;