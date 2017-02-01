"use strict";

module.exports = {
    test: {
        client: 'pg',
        connection: 'postgres://localhost/bartback_test',
        pool: {
            min: 2,
            max: 10
        }
    },

    development: {
        client: 'pg',
        connection: 'postgres://localhost/bartback_development',
        pool: {
          min: 2,
          max: 10
        }
    }
}
