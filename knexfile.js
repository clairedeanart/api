// Update with your config settings.

module.exports = {
    debug: true,
    pool: {
        min: 1,
        max: 20,
    },
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
        connection: `${process.env.DATABASE_URL}?ssl=true`
    }

};
