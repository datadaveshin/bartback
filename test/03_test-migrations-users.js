"use strict";

// Set environment
process.env.NODE_ENV = 'test';

// Require
const { suite, test } = require('mocha');
const assert = require('chai').assert;
const expect = require('chai').expect;
const knex = require('../knex');
const supertest = require('supertest');
const app = require('../app');


// Test Migrations:
suite('Test Migrations - Users', () => {
    before((done) => {
        knex.migrate.latest()
        .then(() => {
            done();
        })
        .catch((err) => {
            done(err);
        });
    });

    test('users columns', (done) => {
        knex('users').columnInfo()
        .then((actual) => {
            const expected = {
                id: {
                    type: 'integer',
                    maxLength: null,
                    nullable: false,
                    defaultValue: 'nextval(\'users_id_seq\'::regclass)'
                },

                user_name: {
                    type: 'character varying',
                    maxLength: 255,
                    nullable: false,
                    defaultValue: '\'\'::character varying'
                },

                email: {
                    type: 'character varying',
                    maxLength: 255,
                    nullable: false,
                    defaultValue: '\'\'::character varying'
                },

                hashed_password: {
                    type: 'character',
                    maxLength: 60,
                    nullable: false,
                    defaultValue: '\'\'::bpchar'
                },

                home_station: {
                    type: 'character varying',
                    maxLength: 255,
                    nullable: false,
                    defaultValue: '\'\'::character varying'
                },

                away_station: {
                    type: 'character varying',
                    maxLength: 255,
                    nullable: false,
                    defaultValue: '\'\'::character varying'
                },

                created_at: {
                    type: 'timestamp with time zone',
                    maxLength: null,
                    nullable: false,
                    defaultValue: 'now()'
                },

                updated_at: {
                    type: 'timestamp with time zone',
                    maxLength: null,
                    nullable: false,
                    defaultValue: 'now()'
                }
            };

            for (const column in expected) {
                assert.deepEqual(
                    actual[column],
                    expected[column],
                    `Column ${column} is not the same`
                );
            }
            done();
        })
        .catch((err) => {
            done(err);
        });
    });
});
