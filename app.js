"use strict";

// Require
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Variables
const PORT = '3031';

// Require for routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const login = require('./routes/login');

// Start app instance
const app = express();

// Use components
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
// app.use(cookieParser());

// Set up session
// app.set('trust proxy', 1) // trust first proxy
// app.use(session(
//     {
//     secret: "OMD has a secret",
//     saveUnitialized: true,
//     resave: true,
//     }
// ));

// Use the session middleware
app.set('trust proxy', 1) // trust first proxy
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

// Start server
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})

// Set views
app.set('view engine', 'ejs')
app.set('views', [
    path.join(__dirname, 'views/')
]);

// Routes
app.use('/', index);
app.use('/auth', auth);
app.use('/login', login);


// 404 messages to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Export
module.exports = app;
