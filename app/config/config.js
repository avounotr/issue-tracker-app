const env = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging' ? 'development' : process.env.NODE_ENV;
const config = require(`./${env}`);

module.exports = config;
