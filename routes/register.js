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
    let newUser;
    let coin;
    const password = req.body.password1;
    bcrypt.hash(password, 12)
    .then((hashed) => {

        newUser = {
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

    .then(() => {
        let senderEmail = req.body.email;
        let senderPassword = req.body.password1;
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
                  homeStation: user.homeStation,
                  awayStation: user.awayStation
              };
              console.log("\n\n\n\n\n@#@#@#@#@#@#@ CURRENT USER @#@#@#@");
              console.log(req.session.user);

              res.redirect('/preferences')
            //   res.redirect('/');
          })
    })
    .catch(err => {
        res.status(400).send(err);
    });
});

module.exports = router;
