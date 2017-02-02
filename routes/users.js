"use strict";

// Require
const express = require('express');
const bcrypt = require('bcrypt-as-promised');
const knex = require('../db/knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// Define router
const router = express.Router();

// GET for new user Sign Up Page
router.get('/new', (req, res) => {
    res.render('signup');
});

// POST for new user Sign Up Page
router.post('/', (req, res) => {
    const password = req.body.pass;
    bcrypt.hash(password, 12)
    .then((hashed) => {
        let newUser = {
            userName: req.body.userName,
            email: req.body.email,
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
            user: user.userName,
            email: user.userName,
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
