"use strict";

// Require
const express = require('express');
const bcrypt = require('bcrypt-as-promised');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// Define router
const router = express.Router();

// Registration Page Show @ localhost:3031/auth/register
router.get('/', (req, res) => {
    res.render('register');
});

// Receive from Registration Page
router.post('/', (req, res) => {
    const password = req.body.password1;
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
    })
    .then(()=>{
        res.redirect('/login')
    })
    .catch(err => {
        res.status(400).send(err);
    });
});

module.exports = router;
