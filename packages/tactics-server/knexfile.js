const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD || '',
        charset: 'utf8'
    },
    debug: false,
    migrations: {
        directory: './tools/migrations'
    },
    seeds: {
        directory: './tools/seeds'
    }
};
