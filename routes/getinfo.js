"use strict";

// ======================================================
// TOGGLE TO GO BACK AND FORTH BETWEEN TEST AND LIVE MODE
// ======================================================
const TESTMODE = false;

// For testing
const etdJSON = require('../data/examples/exampleJson').etdJson2;
const plannerJSON = require('../data/examples/exampleJson').plannerJson2;

// ======================================================
// GET STATION INFO
// ======================================================
const sfRoutes = require('../public/js/data.js').sfRoutes;
const $$each = require('../public/js/helperFunctions-1.js').$$each;
console.log("sfRoutes defined:", sfRoutes);

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
// router.get('/alltrains/:departureStation/', (req, res) => {
//     let departureStation = req.params.departureStation;
//
//     let requestObj = {
//         url: `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${departureStation}&key=${getin}`,
//         method: "GET",
//     };
//
//     return requestPromise(requestObj)
//     .then((body) => {
//         console.log("\n\n$%$%$%$ THE XML BODY $%$%$%$%$");
//         console.log(body);
//         var returnJson = parser.toJson(body);
//         console.log("\n\n$%$%$%$ THE JSON BODY $%$%$%$%$");
//         console.log(returnJson);
//
//         res.json( [ JSON.parse(returnJson) ] );
//         // res.json( [etdJSON] );
//     });
// });

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
        // console.log("\n\n$%$%$%$ THE FIRST PROMISE XML $%$%$%$%$");
        // console.log(promises[0]);
        // console.log("\n\n$%$%$%$ THE SECOND PROMISE XML $%$%$%$%$");
        // console.log(promises[1]);

        var returnJson1 = parser.toJson(promises[0]);
        var returnJson2 = parser.toJson(promises[1]);

        console.log("\n\n$%$%$%$ THE FIRST PROMISE JSON $%$%$%$%$");
        console.log(returnJson1);
        // console.log("\n\n$%$%$%$ THE SECOND PROMISE JSON $%$%$%$%$");
        // console.log(returnJson2);

        if (TESTMODE) {
            res.json( [ etdJSON,  plannerJSON ] );
        } else {
            res.json( [ JSON.parse(returnJson1), JSON.parse(returnJson2) ] );
        }
    });
});

// ====================================================
// BARTBack for trains for selected start and end points
// ====================================================
function checkDirection(here, there, allowedRoutes) {
    /* TODO use a full route array and check for here and there in it all of them, return a subArray, then do the calculation. For now, using route8 for a test*/
    // let routeArr = route8 // THE TEST ARRAY TO BE REMOVED
    // let hereIdx = routeArr.indexOf(here);
    // let thereIdx = routeArr.indexOf(there);

    let routeCandidates = allowedRoutes.filter(route => {
        console.log("routz", route);
        console.log("here", here, "there", there);
        if (route.indexOf(here) > -1 && route.indexOf(there) > -1) {
            return route
        }
    })

    let backStations = {
        back1: [],
        back2: [],
        back3: [],
        back4: [],
        back5: [],
    }

    let hereIdx;
    let thereIdx;
    routeCandidates.forEach(route => {
        hereIdx = route.indexOf(here);
        thereIdx = route.indexOf(there);
        if (hereIdx < thereIdx) {
            backStations.back1.push(route[hereIdx - 1])
            backStations.back2.push(route[hereIdx - 2])
            backStations.back3.push(route[hereIdx - 3])
            backStations.back4.push(route[hereIdx - 4])
            backStations.back4.push(route[hereIdx - 5])
        } else if (hereIdx > thereIdx) {
            backStations.back1.push(route[hereIdx + 1])
            backStations.back2.push(route[hereIdx + 2])
            backStations.back3.push(route[hereIdx + 3])
            backStations.back4.push(route[hereIdx + 4])
            backStations.back4.push(route[hereIdx + 5])
        }
    })

    console.log("routeCandidates", routeCandidates);
    console.log("backStations", backStations);

    let backStations2 = [];
    $$each(backStations, backArray => {
        let filtered = backArray.filter(item => {
            if (item) {
                console.log("item:", item);
                return item
            };
        });
        console.log("filtered", filtered);
        let backArr = Array.from(new Set(filtered))
        if (backArr.length >= 1) {
            backStations2.push(backArr)
        }
    })

    console.log("backStations2", backStations2);

    console.log("hereIdx", hereIdx, "thereIdx", thereIdx);
    let direction;
    if (thereIdx > hereIdx) {
        direction = "North";
    } else if (thereIdx < hereIdx) {
        direction = "South";
    } else if (thereIdx === hereIdx) {
        direction = "Same";
    }

    return {backStations2: backStations2, direction: direction}
}

router.get('/bartback/:departureStation/:arrivalStation/', (req, res) => {
    let departureStation = req.params.departureStation;
    let arrivalStation = req.params.arrivalStation;
    console.log("goony goo goo: ",  departureStation, arrivalStation );
    console.log("routz:", sfRoutes);

    let routeInfo = checkDirection(departureStation, arrivalStation, sfRoutes)
    let stationList = routeInfo.backStations2;
    let destinationDirection = routeInfo.direction;

    console.log("\n\ntypeof stationList:", typeof stationList, "stationList", stationList);

    // Make these instances of a class later
    let requestObjDep0;
    let requestObjPlan0;
    let requestObjDep1;
    let requestObjPlan1;
    let requestObjDep2;
    let requestObjPlan2;
    let requestObjDep3;
    let requestObjPlan3;
    let requestObjDep4;
    let requestObjPlan4;

    requestObjDep0 = {
        url: `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${departureStation}&key=${getin}`,
        method: "GET",
    };

    requestObjPlan0 = {
        url: `http://api.bart.gov/api/sched.aspx?cmd=depart&orig=${departureStation}&dest=${arrivalStation}&date=now&key=${getin}&b=2&a=2&l=1`,
        method: "GET",
    };

    requestObjDep1 = {
        url: `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${stationList[0]}&key=${getin}`,
        method: "GET",
    };

    requestObjPlan1 = {
        url: `http://api.bart.gov/api/sched.aspx?cmd=depart&orig=${stationList[0]}&dest=${stationList[1]}&date=now&key=${getin}&b=2&a=2&l=1`,
        method: "GET",
    };

    requestObjDep2 = {
        url: `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${stationList[1]}&key=${getin}`,
        method: "GET",
    };

    requestObjPlan2 = {
        url: `http://api.bart.gov/api/sched.aspx?cmd=depart&orig=${stationList[1]}&dest=${stationList[2]}&date=now&key=${getin}&b=2&a=2&l=1`,
        method: "GET",
    };

    requestObjDep3 = {
        url: `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${stationList[2]}&key=${getin}`,
        method: "GET",
    };

    requestObjPlan3 = {
        url: `http://api.bart.gov/api/sched.aspx?cmd=depart&orig=${stationList[2]}&dest=${stationList[3]}&date=now&key=${getin}&b=2&a=2&l=1`,
        method: "GET",
    };

    requestObjDep4 = {
        url: `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${stationList[3]}&key=${getin}`,
        method: "GET",
    };

    requestObjPlan4 = {
        url: `http://api.bart.gov/api/sched.aspx?cmd=depart&orig=${stationList[3]}&dest=${stationList[4]}&date=now&key=${getin}&b=2&a=2&l=1`,
        method: "GET",
    };
    //
    // if (stationList[0]){
    //     requestObj1 = {
    //         url: `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${stationList[0]}&key=${getin}`,
    //         method: "GET",
    //     };
    // }
    //
    // if (stationList[1]){
    //     requestObj2 = {
    //         url: `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${stationList[1]}&key=${getin}`,
    //         method: "GET",
    //     };
    // }
    //
    // if (stationList[2]){
    //     requestObj3 = {
    //         url: `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${stationList[2]}&key=${getin}`,
    //         method: "GET",
    //     };
    // }
    //
    // if (stationList[3]){
    //     requestObj4 = {
    //         url: `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${stationList[3]}&key=${getin}`,
    //         method: "GET",
    //     };
    // }
    //
    // if (stationList[4]){
    //     requestObj5 = {
    //         url: `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${stationList[3]}&key=${getin}`,
    //         method: "GET",
    //     };
    // }
    console.log("\n\n");
    console.log("requestObjDep0", requestObjDep0);
    console.log("requestObjPlan0", requestObjPlan0);
    console.log("requestObjDep1", requestObjDep1);
    console.log("requestObjPlan1", requestObjPlan1);
    console.log("requestObjDep2", requestObjDep2);
    console.log("requestObjPlan2", requestObjPlan2);
    console.log("requestObjDep3", requestObjDep3);
    console.log("requestObjPlan3", requestObjPlan3);
    console.log("requestObjDep4", requestObjDep4);
    console.log("requestObjPlan4", requestObjPlan4);


    // stationList.forEach(backArray => {
        // let retObj = {};
        // let requestObj1 = {
        //     url: `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${departureStation}&key=${getin}`,
        //     method: "GET",
        // };
    // });
    // let requestObj1 = {
    //     url: `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${departureStation}&key=${getin}`,
    //     method: "GET",
    // };
    // let requestObj2 = {
    //     // url: `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${departureStation}&key=${getin}`,
    //     url: `http://api.bart.gov/api/sched.aspx?cmd=depart&orig=${departureStation}&dest=${arrivalStation}&date=now&key=${getin}&b=2&a=2&l=1`,
    //     method: "GET",
    // };
    Promise.all([
        requestPromise(requestObjDep0), requestPromise(requestObjPlan0),
        requestPromise(requestObjDep1), requestPromise(requestObjPlan1),
        requestPromise(requestObjDep2), requestPromise(requestObjPlan2),
        requestPromise(requestObjDep3), requestPromise(requestObjPlan3),
        requestPromise(requestObjDep4), requestPromise(requestObjPlan4),
    ])
    // return requestPromise(requestObj)
    .then((promises) => {
        // console.log("\n\n$%$%$%$ THE FIRST PROMISE XML $%$%$%$%$");
        // console.log(promises[0]);
        // console.log("\n\n$%$%$%$ THE SECOND PROMISE XML $%$%$%$%$");
        // console.log(promises[1]);

        var returnJsonDep0 = parser.toJson(promises[0]);
        var returnJsonPlan0 = parser.toJson(promises[1]);
        var returnJsonDep1 = parser.toJson(promises[2]);
        var returnJsonPlan1 = parser.toJson(promises[3]);
        var returnJsonDep2 = parser.toJson(promises[4]);
        var returnJsonPlan2 = parser.toJson(promises[5]);
        var returnJsonDep3 = parser.toJson(promises[6]);
        var returnJsonPlan3 = parser.toJson(promises[7]);
        var returnJsonDep4 = parser.toJson(promises[8]);
        var returnJsonPlan4 = parser.toJson(promises[9]);

        console.log("\n\n$%$%$%$ THE FIRST DEP PROMISE JSON $%$%$%$%$");
        console.log(returnJsonDep0);
        console.log("\n\n$%$%$%$ THE FIRST PLAN PROMISE JSON $%$%$%$%$");
        console.log(returnJsonPlan0);

        console.log("\n\n$%$%$%$ THE LAST DEP PROMISE JSON $%$%$%$%$");
        console.log(returnJsonDep4);
        console.log("\n\n$%$%$%$ THE LAST PLAN PROMISE JSON $%$%$%$%$");
        console.log(returnJsonPlan4);

        if (TESTMODE) {
            res.json( [ etdJSON,  plannerJSON ] );
        } else {
            // res.json( [ JSON.parse(returnJsonDep), JSON.parse(returnJsonArr), JSON.parse(returnJson1), JSON.parse(returnJson2), JSON.parse(returnJson3), JSON.parse(returnJson4)] );
            res.json([
                [returnJsonDep0, returnJsonPlan0],
                [returnJsonDep1, returnJsonPlan1],
                [returnJsonDep2, returnJsonPlan2],
                [returnJsonDep3, returnJsonPlan3],
                [returnJsonDep4, returnJsonPlan4],
                [returnJsonDep5, returnJsonPlan5],
            ])
        }
    });
});

module.exports = router;
