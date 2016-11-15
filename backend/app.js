const express = require('express');
const path = require('path');
//uncomment after placing the favicon
//const favicon = require('serve-favicon');
const winston = require('winston');
const sentry = require('winston-sentry');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');

let logger = new winston.Logger({
    transports: [
        new sentry({
            level: 'warn',
            dsn: 'https://fdd11699dfe64542812a958d044f28e7:7ddba33388734f97be2d3112184072a9@sentry.io/114216',
        }),
        new (winston.transports.Console)({
            timestamp: true,
            colorize: true,
        }),
    ],
});

let app = express();


//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
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

logger.info('Server started');

module.exports = app;
