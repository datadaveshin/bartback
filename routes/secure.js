"use strict";

// Require
const express = require('express');

// Start instance
const router = express.Router();

router.get('/', (req, res) => {
    console.log("HI IM HERE")
    let sess = req.session;
    if (sess.user) {
        let message = JSON.stringify(sess.user);
        res.render('secure', {currUser: message})
    } else {
        res.redirect('/')
    }
})

module.exports = router;
