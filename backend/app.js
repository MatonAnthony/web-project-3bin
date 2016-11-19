const express = require('express');
const path = require('path');
//uncomment after placing the favicon
//const favicon = require('serve-favicon');
const winston = require('winston');
const sentry = require('winston-sentry');
const raven = require('raven');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');

//This is temporary until the config file
const DSN = 'https://0df4e05f1447440c8ec6c484ce86397d:1a5c162f9efa4913896636b12f561262@sentry.io/115501';

let logger = new winston.Logger({
    transports: [
        new sentry({
            level: 'warn',
            dsn: DSN,
        }),
        new (winston.transports.Console)({
            timestamp: true,
            colorize: true,
        }),
    ],
});

let app = express();

//The request handler must be the first item
app.use(raven.middleware.express.requestHandler(DSN));
//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


app.use(raven.middleware.express.errorHandler(DSN));

app.listen(3000);
logger.info('Server started');

module.exports = app;
