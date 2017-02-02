"use strict";

// Require
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Variables
const PORT = '3031';

// Require for routes
const index = require('./routes/index');
const users = require('./routes/users.js');
const token = require('./routes/token.js');

// Start app instance
const app = express();

// Use components
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})

// Set views
app.set('view engine', 'ejs')
app.set('views', [
    path.join(__dirname, 'views/main/'),
    path.join(__dirname, 'views/users/')
]);

// Routes
app.use('/', index);
app.use('/users', users);
app.use('/token', token);

// 404 messages to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Export
module.exports = app;
