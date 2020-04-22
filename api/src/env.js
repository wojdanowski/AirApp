// Imports
const dotenv = require("dotenv");

// Load .env
dotenv.config()

// Environment
exports.NODE_ENV = process.env.NODE_ENV

// Port
exports.PORT = process.env.PORT || 8000

//DB
exports.DB = process.env.DB || "mongodb://localhost:27017"