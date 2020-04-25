const dotenv = require('dotenv');

dotenv.config();
// Environment
exports.NODE_ENV = process.env.NODE_ENV;
// Port
exports.PORT = process.env.PORT || 8000;
// DB
exports.DB = process.env.DB || 'mongodb://localhost:27017';
// CONFIG
exports.UPDATESCHEDULE = process.env.UPDATESCHEDULE || 1000 * 60 * 60 * 12;
