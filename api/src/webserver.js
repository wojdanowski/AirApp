// modules
const env = require('./env');
const db = require('./setup/db');

const express = require('express');
const bodyParser = require('body-parser');

//app
const app = express();
const apiRoutes = require('./api-routes');

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
app.get('/', (req, res) => {
  console.log(`Received ping!!!`);
  res.send('Server is up.');
});
app.use('/api', apiRoutes);

// run
app.listen(env.PORT, function () {
  console.log('Running on port ' + env.PORT);
});
