"use strict";

// Require
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const express = require('express');
const request = require('request');
const requestPromise = require('request-promise');
const parser = require('xml2json');

// Start instance
const router = express.Router();

router.get('/:departure/', (req, res) => {
    var departure = req.params.departure
    // var arrival = req.params.arrival
    const getin = 'MW9S-E7SL-26DU-VV8V'
    let departureObj = {
        url: `http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${departure}&key=${getin}`,
        method: "GET",
    };
    return requestPromise(departureObj)
    .then((body) => {
        console.log("\n\n$%$%$%$ THE BODY $%$%$%$%$");
        console.log(body);
        var returnJson = parser.toJson(body);
        res.json(JSON.parse(returnJson ));
    });
})

module.exports = router;
