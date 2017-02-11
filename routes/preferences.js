"use strict";

// Require
const express = require('express');
const bcrypt = require('bcrypt-as-promised');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// Define router
const router = express.Router();

// Show Login Form @ localhost:3031/login
// router.get('/', function(req, res) {
//     // res.render('preferences');
//     // res.send('preferences');
//     res.render('preferences');
// });

router.get('/', (req, res) => {
   // let sess = req.session;
   // if (sess.user) {
   //     let userInfo = sess.user
   //     let message = JSON.stringify(sess.user);
    //    res.redirect('/secure');
    if (req.session.user) {

        // console.log("^^^^^^^^^^^^^^^^ USERNAME", userInfo.userName)
        // res.render('preferences', {userName: userInfo.userName});
        res.render('preferences2');
    } else {
        res.redirect('/');
    };
});

router.post('/', (req, res) => {
    let homeStation = req.body.home
    let awayStation = req.body.away
    let session = req.session
    let userID = req.session.user.id

    req.session.home = homeStation;
    req.session.away = awayStation;

    let prefsUpdate = {};

    if (homeStation) prefsUpdate.homeStation = homeStation
    if (awayStation) prefsUpdate.awayStation = awayStation

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
            // res.send('YES')
            // res.redirect('/', {
            //     homeStation: homeStation,
            //     awayStation: awayStation
            // })
            res.redirect('/')
        })
    // res.send('YES')
})

// .then(() => {
//     req.session.user = {
//         id: user.id,
//         userName: user.userName,
//         email: user.email
//     };
//     res.redirect('/');
// })

// Receive from Registration Page
// router.post('/example', (req, res) => {
//     const password = req.body.password1;
//     bcrypt.hash(password, 12)
//     .then((hashed) => {
//
//         let newUser = {
//             userName: req.body.userName,
//             email: req.body.email,
//             homeStation: req.body.homeStation,
//             awayStation: req.body.awayStation,
//             hashedPassword: hashed
//         };
//         console.log("\n\n\n\n\n\n######## IN HERE ###############")
//         console.log("newUser", newUser)
//         console.log("######## IN HERE ###############\n\n\n\n\n\n")
//
//         return knex('users')
//             .insert(decamelizeKeys(newUser), ['id','user_name', 'email', 'home_station', 'away_station'])
//     })
//     .then(()=>{
//         res.redirect('/auth/login')
//     })
//     .catch(err => {
//         res.status(400).send(err);
//     });
// });

module.exports = router;
