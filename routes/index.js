"use strict";

// Require
const express = require('express');

// Start instance
const router = express.Router();

// Main Page
router.get('/', (req, res, next) => {
   // res.send({Babu: 'Babu'})
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
