const dotenv = require('dotenv');

dotenv.config();
// Environment
exports.NODE_ENV = process.env.NODE_ENV;
// Port
exports.PORT = process.env.PORT || 8000;
// DB
exports.DB = process.env.DB || 'mongodb://localhost:27017';
// mailing
exports.EMAIL_HOST = process.env.EMAIL_HOST || 'localhost';
exports.EMAIL_PORT = process.env.EMAIL_PORT || 25;
exports.EMAIL_USERNAME = process.env.EMAIL_USERNAME;
exports.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
// CONFIG
exports.UPDATESCHEDULE = process.env.UPDATESCHEDULE || 1000 * 60 * 60 * 12;
