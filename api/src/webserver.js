// modules
const env = require('./setup/env');
const db = require('./setup/db');

const express = require('express');
const bodyParser = require('body-parser');

//app
const app = express();
const apiRoutes = require('./routes/api-routes');

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
app.get('/', (req, res) => {
  res.send('Server is up.');
});
app.use('/api', apiRoutes);

// run
console.log(`Environment: ${env.NODE_ENV}`);
app.listen(env.PORT, function () {
  console.log('Running on port ' + env.PORT);
});
