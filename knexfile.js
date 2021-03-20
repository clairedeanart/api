// Update with your config settings.

const pg = require('pg');

pg.defaults.ssl = {
   rejectUnauthorized: false,
};

module.exports = {

    development: {
        client: 'pg',
        connection: 'postgresql://localhost/claire-dean-art',
    },

    test: {
        client: 'pg',
        connection: 'postgresql://localhost/claire-dean-art-test'
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 1,
            max: 10,
        },
        ssl: {
            rejectUnauthorized: false,
        },
    },
};
