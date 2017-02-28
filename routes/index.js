"use strict";

// Require
const express = require('express');
const session = require('express-session');

// Start instance
const router = express.Router();

// Main Page
router.get('/', (req, res) => {
    let sess = req.session;
    if (sess.user) {
        let userInfo = sess.user;
        console.log("^^^^^^^^^^^^^^^^ USERNAME", userInfo.userName);
        console.log("^^^^^^^^^^^^^^^^ HOME", userInfo.homeStation);
        console.log("^^^^^^^^^^^^^^^^ AWAY", userInfo.awayStation);
        console.log(sess);
        console.log(userInfo);
        res.render('index', {
            userName: userInfo.userName,
            homeStation: userInfo.homeStation,
            awayStation: userInfo.awayStation});
    } else {
        res.render('index', {
                            userName: "",
                            homeStation: "",
                            awayStation: ""
                            }
        );
    //    res.render('index')
    }
});

// Favicon issues
router.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

// Instructions
router.get('/instructions', (req, res) => {
   res.render('instructions');
});

// About Page
router.get('/about', (req, res) => {
   res.render('about');
});

// Contact Page
router.get('/contact', (req, res) => {
   res.render('contact');
});

module.exports = router;
