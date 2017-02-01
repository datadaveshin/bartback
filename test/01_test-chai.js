"use strict";

// Set environment
process.env.NODE_ENV = 'test';

// Require
const assert = require('chai').assert;
const expect = require('chai').expect;
const knex = require('../knex');
const supertest = require('supertest');
const app = require('../app');


// Test Chai itself
describe("Test Chai", () => {
    it("should return true for true===true", () => {
        expect(true === true).to.be.true;
    });
    it("should return false for false===true", () => {
        expect(false === true).to.be.false;
    });
});

