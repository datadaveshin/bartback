"use strict";

// Require
const express = require('express');
const bcrypt = require('bcrypt-as-promised');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// Define router
const router = express.Router();

// Show Preferences Form
router.get('/', (req, res) => {
    if (req.session.user) {
        res.render('preferences2');
    } else {
        res.redirect('/');
    };
});

// Recieve Data from Preferences Form
router.post('/', (req, res) => {
    let homeStation = req.body.home;
    let awayStation = req.body.away;
    let userID = req.session.user.id;

    req.session.user.home = homeStation;
    req.session.user.away = awayStation;

    let prefsUpdate = {};

    if (homeStation) {prefsUpdate.homeStation = homeStation};
    if (awayStation) {prefsUpdate.awayStation = awayStation};

    console.log("\n\n\n\n:::::::::::THE HOME STATION IS POSTED :::::::::::");
    console.log(homeStation);
    console.log("\n\n\n\n:::::::::::THE AWAY STATION IS POSTED :::::::::::");
    console.log(awayStation);
    console.log("\n\n\n\n:::::::::::THE USER ID IS POSTED :::::::::::");
    console.log(userID);

    knex('users')
        .update(decamelizeKeys(prefsUpdate), '*')
        .where('id', userID)
        .then(() => {
            res.redirect('/')
        })
})

module.exports = router;
