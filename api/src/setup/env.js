const dotenv = require('dotenv');

dotenv.config();
// Environment
exports.NODE_ENV = process.env.NODE_ENV;
exports.PORT = process.env.PORT || 8000;
exports.DB = process.env.DB || 'mongodb://localhost:27017';
exports.DB_ADDRESS = process.env.DB_ADDRESS || 'mongodb://localhost:27017';
exports.DB_PASSWORD = process.env.DB_PASSWORD;
// mailing
exports.EMAIL_HOST = process.env.EMAIL_HOST || 'localhost';
exports.EMAIL_PORT = process.env.EMAIL_PORT || 25;
exports.EMAIL_USERNAME = process.env.EMAIL_USERNAME;
exports.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
// CONFIG
exports.STATIONSCHEDULE = process.env.STATIONCHEDULE || 60 * 60 * 12;
exports.AIRDATASCHEDULE = process.env.AIRDATASCHEDULE || 60 * 30;
exports.TIMEZONE = process.env.TIMEZONE || 'Europe/Warsaw';
// Frontend
exports.ACTIVATE_SUB_LINK =
  process.env.ACTIVATE_SUB_LINK || 'http://localhost/';
