require('dotenv').config(); // this is important!

module.exports = {
    targetEnv: process.env.TARGET_ENV || process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    jwtSecret: process.env.JWT_SECRET || 'secret',

    // Database
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        username: process.env.DB_USER || 'admin',
        password: process.env.DB_PASS || 'admin',
        name: process.env.DB_NAME || 'menu'
    },

    // Back
    BackUrl: process.env.BACKEND_URL || 'localhost',

};
