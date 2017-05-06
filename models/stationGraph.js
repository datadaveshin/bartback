"use strict";

let testVal = 7;
let routes = require('../public/js/data').allRoutesUpperStoN
let stationGraph = {};
console.log("\n\nTHE UPPER ROUTES", routes)

routes.forEach(route => {
    route.forEach((station, index) => {
        if (!stationGraph[station]) {stationGraph[station] = [];}
        if (route[index - 1]) {stationGraph[station].push(route[index - 1]);}
        if (route[index + 1]) {stationGraph[station].push(route[index + 1]);}
    })
})

module.exports = {
    stationGraph: stationGraph,
    testVal: testVal
};
