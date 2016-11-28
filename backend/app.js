const express = require('express');
const path = require('path');
//TODO uncomment after placing the favicon
//const favicon = require('serve-favicon');
const winston = require('winston');
const sentry = require('winston-sentry');
const raven = require('raven');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const index = require('./routes/index');
const users = require('./routes/users');


/**
 * Load the config file
 */
let configPath;
switch(process.env.NODE_ENV) {
    case 'PRODUCTION': 
        configPath = 'config/production.env';
        break;
    case 'DEV':  
        configPath = 'config/dev.env';
        break;
    case 'TEST':  
        configPath = 'config/test.env';
        break;
    default:  
        /* Fallback to DEV config */
        configPath = 'config/dev.env';
}
require('dotenv').config({silent: true, path: configPath});

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

/*mongoose.connect('mongodb://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASS
    + '@' + process.env.MONGO_URL);
*/
mongoose.connect('mongodb://' + process.env.MONGO_URL);

let db = mongoose.connection;
db.on('error', (err) => {
    logger.log('error', '[DB] ' + err.name + ' : ' + err.message);
});

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

module.exports = app;
