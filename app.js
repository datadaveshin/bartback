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
// const login = require('./routes/login');
const auth = require('./routes/auth');
const secure = require('./routes/secure');

// Start app instance
const app = express();

// Use components
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
// app.use(cookieParser());

// Set up session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }}))

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
// app.use('/login', login);
app.use('/auth', auth);
app.use('/secure', secure);


// 404 messages to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Export
module.exports = app;
