"use strict";

// For testing
const etdJSON = require('../data/examples/exampleJson').etdJson2;
const plannerJSON = require('../data/examples/exampleJson').plannerJson2;

// Require
const express = require('express');
const request = require('request');
const requestPromise = require('request-promise');
const parser = require('xml2json');

// API key
const getin = 'MW9S-E7SL-26DU-VV8V';

// Start instance
const router = express.Router();

// ==================================
// Get ETD for All trains at stations
// ==================================
router.get('/alltrains/:departureStation/', (req, res) => {
    let departureStation = req.params.departureStation;

    let requestObj = {
        url: `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${departureStation}&key=${getin}`,
        method: "GET",
    };

    return requestPromise(requestObj)
    .then((body) => {
        console.log("\n\n$%$%$%$ THE XML BODY $%$%$%$%$");
        console.log(body);
        var returnJson = parser.toJson(body);
        console.log("\n\n$%$%$%$ THE JSON BODY $%$%$%$%$");
        console.log(returnJson);

        res.json( [ JSON.parse(returnJson) ] );
        // res.json( [etdJSON] );
    });
});

// ====================================================
// Get ETD for trains for selected start and end points
// ====================================================
router.get('/routeall/:departureStation/:arrivalStation/', (req, res) => {
    let departureStation = req.params.departureStation;
    let arrivalStation = req.params.arrivalStation;
    let requestObj1 = {
        url: `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${departureStation}&key=${getin}`,
        method: "GET",
    };
    let requestObj2 = {
        // url: `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${departureStation}&key=${getin}`,
        url: `http://api.bart.gov/api/sched.aspx?cmd=depart&orig=${departureStation}&dest=${arrivalStation}&date=now&key=${getin}&b=2&a=2&l=1`,
        method: "GET",
    };
    Promise.all([requestPromise(requestObj1), requestPromise(requestObj2)])
    // return requestPromise(requestObj)
    .then((promises) => {
        console.log("\n\n$%$%$%$ THE FIRST PROMISE XML $%$%$%$%$");
        console.log(promises[0]);
        console.log("\n\n$%$%$%$ THE SECOND PROMISE XML $%$%$%$%$");
        console.log(promises[1]);

        var returnJson1 = parser.toJson(promises[0]);
        var returnJson2 = parser.toJson(promises[1]);

        console.log("\n\n$%$%$%$ THE FIRST PROMISE JSON $%$%$%$%$");
        console.log(returnJson1);
        console.log("\n\n$%$%$%$ THE SECOND PROMISE JSON $%$%$%$%$");
        console.log(returnJson2);

        // res.json( [ JSON.parse(returnJson1), JSON.parse(returnJson2) ] );
        res.json( [ etdJSON,  plannerJSON ] );
    });
});

module.exports = router;
