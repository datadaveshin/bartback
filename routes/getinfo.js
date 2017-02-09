"use strict";

// Require
const express = require('express');
const request = require('request');
const requestPromise = require('request-promise');
const parser = require('xml2json');

// Start instance
const router = express.Router();

// Route to return "All Routes"
router.get('/allroutes/:departureStation/', (req, res) => {
    const getin = 'MW9S-E7SL-26DU-VV8V'
    let departureStation = req.params.departureStation

    let departureObj = {
        url: `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${departureStation}&key=${getin}`,
        method: "GET",
    };

    return requestPromise(departureObj)
    .then((body) => {
        console.log("\n\n$%$%$%$ THE XML BODY $%$%$%$%$");
        console.log(body);
        var returnJson = parser.toJson(body);
        console.log("\n\n$%$%$%$ THE JSON BODY $%$%$%$%$");
        console.log(returnJson);
        res.json(JSON.parse(returnJson ));
    });
})

module.exports = router;
