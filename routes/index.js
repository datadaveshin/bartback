"use strict";

// Require
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const express = require('express');

// Start instance
const router = express.Router();

// Main Page
router.get('/', (req, res) => {
   let sess = req.session;
   if (sess.user) {
       let message = JSON.stringify(sess.user);
       res.send("I am Babu and " + message);
   } else {
       res.render('index');
   };
});

// About Page
// router.get('/about', (req, res, next) => {
//    res.render('about')
// })

// Contact Page
// router.get('/contact', (req, res, next) => {
//    res.render('contact')
// })

module.exports = router;
