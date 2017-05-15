"use strict";

// Set environment
process.env.NODE_ENV = 'test';

// Set up testing
const assert = require('chai').assert;
const expect = require('chai').expect;

// Set variables for things to be tested
let testVal = require('../models/stationGraph').testVal;
let stationGraph = require('../models/stationGraph').stationGraph;
let Queue = require('../models/stationGraph').Queue
let getPath = require('../models/stationGraph').getPath;
console.log("\n\nTHE STATION GRAPH IS\n", stationGraph);


// -----------------------------------------------
// Tests
// -----------------------------------------------

// Dummy test to check if files are being read, etc.
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

// Test Queue for searching and returning a path
describe('Queue for using for searching', () => {
    var testQueue
    beforeEach('make and load a test queue', ()=>{
        testQueue = new Queue;
        testQueue.enqueue(-2);
        testQueue.enqueue('minusOne')
        testQueue.enqueue('zero')
        testQueue.enqueue(1)
        testQueue.enqueue('two');
        testQueue.enqueue(3);
        testQueue.dequeue();
        testQueue.dequeue();
        console.log("\n\nTEST QUEUE\n",testQueue );
    })

    it("should be an array with 'zero', 1, 'two', 3", () => {
        expect(testQueue.queue).to.eql(['zero', 1, 'two', 3]);
    })

    it("should have size of 4", () => {
        expect(testQueue.size).to.equal(4);
    })

    it("should return 'zero' if dequeuing", () => {
        expect(testQueue.dequeue()).to.equal('zero')
    })
})

// Get a path from start station to destination station
describe('BFS path to from start to destination station', () => {

    it("should return 'MONT' as the start station", () => {
        expect(getPath(stationGraph, 'MONT', 'PLZA')[0]).to.equal('MONT');
    });

    it("should return 'PLZA' as the destination station", () => {
        expect(getPath(stationGraph, 'MONT', 'PLZA')[getPath(stationGraph, 'MONT', 'PLZA').length - 1]).to.equal('PLZA');
    });
});
