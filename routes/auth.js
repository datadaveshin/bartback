"use strict";

// Require
const express = require('express');
const bcrypt = require('bcrypt-as-promised');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// Define router
const router = express.Router();


// Show registration page @ localhost:3031/auth/register
router.get('/register', (req, res) => {
    res.render('register');
});

// Receive information from Registration Page
router.post('/', (req, res) => {
    // console.log("\n\n\n\n\n\n######## IN HERE ###############")
    const password = req.body.password1;

    // console.log("######## IN HERE ###############\n\n\n\n\n\n")
    bcrypt.hash(password, 12)
    .then((hashed) => {

        let newUser = {
            userName: req.body.userName,
            email: req.body.email,
            homeStation: req.body.homeStation,
            awayStation: req.body.awayStation,
            hashedPassword: hashed
        };
        console.log("\n\n\n\n\n\n######## IN HERE ###############")
        console.log("newUser", newUser)
        console.log("######## IN HERE ###############\n\n\n\n\n\n")

        return knex('users')
        .insert(decamelizeKeys(newUser), ['id','user_name', 'email', 'home_station', 'away_station'])
        res.redirect('/auth/login')
    })
    .then ((row) => {
        // const user = camelizeKeys(row[0]);
        // console.log("\n\n\n######## res.cookie.user ####", res.cookie.user)
        // console.log("\n\n\n######## res.cookie.user ####", res.cookie)
        // res.cookie.user = user.id
        // console.log("\n\n\n######## res.cookie.user ####", res.cookie.user)

    })
    .catch(err => {
        console.log("NEW USER POST ERROR:", err);
        res.status(400).send(err);
    });
});

// Show Login form @ localhost:3031/auth/login
router.get('/login', function(req, res) {
    res.render('login');
});


module.exports = router;
