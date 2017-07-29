// Update with your config settings.

module.exports = {

    development: {
        client: 'pg',
        connection: 'postgresql://localhost/claire-dean-art'
    },

    test: {
        client: 'pg',
        connection: 'postgresql://localhost/claire-dean-art-test'
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL
    }

};
