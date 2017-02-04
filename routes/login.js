"use strict";

// Require
const express = require('express');
const bcrypt = require('bcrypt-as-promised');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// Define router
const router = express.Router();

// Show Login Form @ localhost:3031/login
router.get('/', function(req, res) {
    res.render('login');
});

// Recieve from Login Form
router.post('/', (req, res, next) => {

  let senderEmail = req.body.email;
  let senderPassword = req.body.password;
  let user;

  knex('users')
    .where('email', senderEmail)
    .first()
    .then((row) => {
        if (!row) {
            res.redirect('/login');
        }
        user = camelizeKeys(row);
        console.log("&& USER:", user)
        return bcrypt.compare(senderPassword, user.hashedPassword);
    })
    .then(() => {
        // Use the session middleware
        // router.set('trust proxy', 1) // trust first proxy
        // router.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000, user: user }}))
        req.session.user = user;
        // res.send('Logged in as' + req.session.cookie.user);
        // res.send('Logged in');
        res.redirect('/');
    })
    .catch(err => {
        res.redirect('/login');
    });
});

module.exports = router;
