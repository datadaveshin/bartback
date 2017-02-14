"use strict";

// Require
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Variables
const PORT = '3031';

// Require for routes
const index = require('./routes/index');
const register = require('./routes/register');
const auth = require('./routes/auth');
const getinfo = require('./routes/getinfo');
const preferences = require('./routes/preferences');

// Start app instance
const app = express();

// Use components
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

// Set up session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }}))

// Start server
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})



// Set views
app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, 'views/')
]);

// Routes
app.use('/', index);
app.use('/register', register);
app.use('/auth', auth);
app.use('/getinfo', getinfo);
app.use('/preferences', preferences);


// 404 messages to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// ## CORS middleware
// For more info see: https://gist.github.com/cuppster/2344435
//
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

// Export
module.exports = app;
