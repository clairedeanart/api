// Update with your config settings.

console.log('SSL?', process.env.NODE_ENV === 'production');

module.exports = {

    pool: {
        min: 1,
        max: 20,
    },

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
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },

    ssl: {
        require: true,
        rejectUnauthorized: false,
    },
};
