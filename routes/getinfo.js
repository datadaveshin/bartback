"use strict";

let etdJSON = {"root":{"uri":"http://api.bart.gov/api/etd.aspx?cmd=etd&orig=19th","date":"02/09/2017","time":"06:58:01 PM PST","station":{"name":"19th St. Oakland","abbr":"19TH","etd":[{"destination":"Fremont","abbreviation":"FRMT","limited":"0","estimate":[{"minutes":"2","platform":"2","direction":"South","length":"5","color":"ORANGE","hexcolor":"#ff9933","bikeflag":"1"},{"minutes":"17","platform":"2","direction":"South","length":"5","color":"ORANGE","hexcolor":"#ff9933","bikeflag":"1"},{"minutes":"32","platform":"2","direction":"South","length":"6","color":"ORANGE","hexcolor":"#ff9933","bikeflag":"1"}]},{"destination":"Millbrae","abbreviation":"MLBR","limited":"0","estimate":[{"minutes":"7","platform":"2","direction":"South","length":"8","color":"RED","hexcolor":"#ff0000","bikeflag":"1"},{"minutes":"22","platform":"2","direction":"South","length":"9","color":"RED","hexcolor":"#ff0000","bikeflag":"1"},{"minutes":"37","platform":"2","direction":"South","length":"10","color":"RED","hexcolor":"#ff0000","bikeflag":"1"}]},{"destination":"Pittsburg/Bay Point","abbreviation":"PITT","limited":"0","estimate":[{"minutes":"1","platform":"3","direction":"North","length":"10","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"},{"minutes":"3","platform":"3","direction":"North","length":"9","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"},{"minutes":"13","platform":"3","direction":"North","length":"10","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"}]},{"destination":"Richmond","abbreviation":"RICH","limited":"0","estimate":[{"minutes":"Leaving","platform":"1","direction":"North","length":"8","color":"ORANGE","hexcolor":"#ff9933","bikeflag":"1"},{"minutes":"6","platform":"1","direction":"North","length":"8","color":"RED","hexcolor":"#ff0000","bikeflag":"1"},{"minutes":"12","platform":"1","direction":"North","length":"5","color":"ORANGE","hexcolor":"#ff9933","bikeflag":"1"}]},{"destination":"SF Airport","abbreviation":"SFIA","limited":"0","estimate":[{"minutes":"Leaving","platform":"2","direction":"South","length":"10","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"},{"minutes":"16","platform":"2","direction":"South","length":"10","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"},{"minutes":"45","platform":"2","direction":"South","length":"9","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"}]},{"destination":"SFO/Millbrae","abbreviation":"MLBR","limited":"0","estimate":[{"minutes":"30","platform":"2","direction":"South","length":"10","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"},{"minutes":"82","platform":"2","direction":"South","length":"10","color":"YELLOW","hexcolor":"#ffff33","bikeflag":"1"}]}]},"message":{}}}

// Require
const express = require('express');
const request = require('request');
const requestPromise = require('request-promise');
const parser = require('xml2json');

// API key
const getin = 'MW9S-E7SL-26DU-VV8V'

// Start instance
const router = express.Router();

// ==================================
// Get ETD for All trains at stations
// ==================================
router.get('/alltrains/:departureStation/', (req, res) => {
    let departureStation = req.params.departureStation

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
        // res.json(etdJSON);
    });
})

// ====================================================
// Get ETD for trains for selected start and end points
// ====================================================
router.get('/routeall/:departureStation/:arrivalStation/', (req, res) => {
    let departureStation = req.params.departureStation
    let arrivalStation = req.params.arrivalStation
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

        res.json( [ JSON.parse(returnJson1), JSON.parse(returnJson2) ] )

        // var returnJson = parser.toJson(body);
        // console.log("\n\n$%$%$%$ THE JSON BODY $%$%$%$%$");
        // console.log(returnJson);
        // res.json(JSON.parse(returnJson ));
    });
})

module.exports = router;
