// modules
const env = require('./env')  //TODO: import (ES)
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//app
const app = express();
const apiRoutes = require("./api-routes");

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB
mongoose.connect(env.DB + "/airDataDB", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
if (!db) {
    console.log("Error connecting db")
} else {
    console.log("Db connected successfully")
}

// routes
app.get('/', (req, res) => res.send('Server is up.'));
app.use('/api', apiRoutes);

// run
app.listen(env.PORT, function () {
    console.log("Running on port " + env.PORT);
});