"use strict";

// Set environment
process.env.NODE_ENV = 'test';

// Set up testing
const assert = require('chai').assert;
const expect = require('chai').expect;

// Test to see if file is being accessed
let testVal = require('../models/stationGraph').testVal;

// Test the Graph
let stationGraph = require('../models/stationGraph').stationGraph;
console.log("\n\nTHE STATION GRAPH IS\n", stationGraph);


// -----------------------------------------------
// Tests
// -----------------------------------------------

// Dummy test
describe('Test this file', () => {
    it("should return true for true===true", () => {
        expect(true === true).to.be.true;
    });

    it("should equal 7", () => {
        expect(testVal).to.equal(7);
    });
})

// Create a graph
describe('Generic Bart Map Graph', () => {
    it("should have length of 46", () => {
        expect(Object.keys(stationGraph).length).to.equal(46)
    });

    it("should report that the number of edges for 'MONT' is 2", () => {
        expect(stationGraph.MONT.length).to.equal(2)
    });

    it("should report that 'MONT' has an edge 'EMBR'", () => {
        expect(stationGraph.MONT.includes('EMBR')).to.be.true;
    });

    it("should report that 'MONT' has an edge 'POWL'", () => {
        expect(stationGraph.MONT.includes('POWL')).to.be.true;
    });

    it("should report that 'RICH' has an edgelist that equals ['DELN']", () => {
        expect(stationGraph.RICH).to.eql(['DELN']);
    });

    it("should report that 'MLBR' has an edglist length of 2", () => {
        expect(stationGraph.MLBR.length).to.equal(2);
    });

    it("should report that 'MLBR' has an edgelist that includes 'SFIA'", () => {
        expect(stationGraph.MLBR.includes('SFIA')).to.be.true;
    });

    it("should report that 'MLBR' has an edgelist that includes 'SBRN'", () => {
        expect(stationGraph.MLBR.includes('SBRN')).to.be.true;
    });

});
