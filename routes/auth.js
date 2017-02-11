"use strict";

// Require
const express = require('express');
const bcrypt = require('bcrypt-as-promised');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// Define router
const router = express.Router();

// Show Login Form @ localhost:3031/login
router.get('/login', function(req, res) {
    res.render('login');
});

// Recieve from Login Form
router.post('/login', (req, res, next) => {

  let senderEmail = req.body.email;
  let senderPassword = req.body.password;
  let user;

  knex('users')
    .where('email', senderEmail)
    .first()
    .then((row) => {
        if (!row) {
            res.redirect('/auth/login');
        }
        user = camelizeKeys(row);
        return bcrypt.compare(senderPassword, user.hashedPassword);
    })
    .then(() => {
        req.session.user = {
            id: user.id,
            userName: user.userName,
            email: user.email,
            home: user.homeStation,
            away: user.awayStation
        };
        console.log("\n\n\n\n\n@#@#@#@#@#@#@ CURRENT USERS SMACK @#@#@#@", req.session.user);
        console.log();
        res.redirect('/');
    })
    .catch(err => {
        res.redirect('/auth/login');
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
})

module.exports = router;
