"use strict";

// Require
const express = require('express');
const bcrypt = require('bcrypt-as-promised');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// Define router
const router = express.Router();

// show sign in form for existing user
router.get('/login', function(req, res) {
  var errorMsg = '';

  if (req.query.login === 'invalid') {
    errorMsg = 'Invalid attempt. Please check your credentials and try again.';
  }

  res.render('login', {msg: errorMsg});
});

// GET for new user Sign Up Page
router.get('/new', (req, res) => {
    res.render('register');
});

// POST for new user Sign Up Page
router.post('/', (req, res) => {
    const password = req.body.pass;
    bcrypt.hash(password, 12)
    .then((hashed) => {
        let newUser = {
            userName: req.body.userName,
            email: req.body.email,
            homeStation: req.body.homeStation,
            awayStation: req.body.awayStation,
            hashedPassword: hashed
        }
    });
    return knex('users')
    .insert(decamelizeKeys(newUser), ['user', 'email', 'bcryptPass'])
    .then((row) => {
        const user = camelizeKeys(row[0]);
        delete user.createdAt;
        delete user.updatedAt;
        delete user.hashedPassword;

        res.render('confirmation', {
            userName: user.userName,
            email: user.userName,
            homeStation: user.homeStation,
            awayStation: user.awayStation,
            passwordStatus: 'saved',
            status: 'added'
        })
    })
    .catch(err => {
        console.log("NEW USER POST ERROR:", err);
        res.status(400).send(err);
    });
});

module.exports = router;
