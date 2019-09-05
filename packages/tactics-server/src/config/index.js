import dotenv from 'dotenv';
import dbConfig from '../../knexfile.js';

dotenv.config({
    path: './.env'
});

export default {
    PORT : process.env.PORT,
    
    WEBSITE_URL: 'http://localhost:8000',
    
    DB: dbConfig,
    
    LOGGER: {
        LOG_LEVEL: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
    },
    
    SESSION: {
        SECRET: process.env.SESSION_SECRET
    },

    REFRESH_TOKEN: {
        SECRET: process.env.REFRESH_TOKEN_SECRET,
        MAXAGE: 1000 * 60 * 60 * 24 * 7, // 1 week
        PATH: '/',
        HTTPONLY: true,
        SECURE: false,
        SAMESITE: false
    },
    
    COOKIE: {
        PATH: '/',
        SECURE: false,
        SAMESITE: false,
        MAXAGE: 604800000,
        HTTPONLY: false
    },

    JWT: {
        MAXAGE: 1000 * 60 * 15, // 15min
        ISSUER: 'http://localhost:8000'
    },


    RESET_PASSWORD: {
        EXPIRE: 1000 * 60 * 60 // 1 hour
    },
    
    MAILER: {
        ADDRESS: process.env.EMAIL_ADDRESS,
        PASSWORD: process.env.EMAIL_PASSWORD
    }
};

