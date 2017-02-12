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
       let userInfo = sess.user
       let message = JSON.stringify(sess.user);
    //    res.redirect('/secure');
       console.log("^^^^^^^^^^^^^^^^ USERNAME", userInfo.userName)
       console.log("^^^^^^^^^^^^^^^^ HOME", userInfo.home)
       console.log("^^^^^^^^^^^^^^^^ AWAY", userInfo.away)
       console.log(sess);
       console.log(userInfo);
       res.render('index', {
            userName: userInfo.userName,
            homeStation: userInfo.home,
            awayStation: userInfo.away});
   } else {
       res.render('index', {

       homeStation: "",
       awayStation: ""});
    //    res.render('index')
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
