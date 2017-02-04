"use strict";

// Require
const logger = require('morgan');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
const express = require('express');

// Start instance
const router = express.Router();

// Main Page
router.get('/', (req, res, next) => {
   // res.send({Babu: 'Babu'})
   console.log("\n\n######### req.cookies #######\n", req.cookies)
   console.log("\n\n######### req.session #######\n", req.session)
   res.render('index')
})

// About Page
// router.get('/about', (req, res, next) => {
//    res.render('about')
// })

// Contact Page
// router.get('/contact', (req, res, next) => {
//    res.render('contact')
// })

module.exports = router;
