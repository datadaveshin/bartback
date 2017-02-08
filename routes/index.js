"use strict";

// Require
const logger = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');

// Start instance
const router = express.Router();

// Main Page
router.get('/', (req, res) => {
   let sess = req.session;
   if (sess.user) {
       let message = JSON.stringify(sess.user);
       res.redirect('/secure');
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
