"use strict";

let testVal = 7;
let routes = require('../public/js/data').allRoutesUpperStoN
let stationGraph = {};
console.log("\n\nTHE UPPER ROUTES", routes)

routes.forEach(route => {
    route.forEach((station, index) => {
        let stationBefore = route[index - 1]
        let stationAfter = route[index + 1]

        if (!stationGraph[station]) {
            stationGraph[station] = [];
        }

        if (stationGraph[station]) {
            if (stationBefore && !stationGraph[station].includes(stationBefore)) {
                stationGraph[station].push(stationBefore);
            }
            if (stationAfter && !stationGraph[station].includes(stationAfter)) {
                stationGraph[station].push(stationAfter);
            }
        }

        // if (stationBefore && stationGraph[station].includes(stationBefore)) {
        //     stationGraph[station].push(stationBefore);
        // }
        //
        // if (stationBefore && stationGraph[station].includes(stationBefore)) {
        //     stationGraph[station].push(stationBefore);
        // }
    })
})

module.exports = {
    stationGraph: stationGraph,
    testVal: testVal
};
