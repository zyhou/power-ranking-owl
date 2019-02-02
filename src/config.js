module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_URL: process.env.API_URL || 'http://localhost:3001',
    ROUTE_URL: process.env.ROUTE_URL || '/api/tweet',
    CONSUMER_KEY: process.env.CONSUMER_KEY,
    CONSUMER_SECRET: process.env.CONSUMER_SECRET,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
};
