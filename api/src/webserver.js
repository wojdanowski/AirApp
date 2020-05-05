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

// cors
// TODO: ogarnąć lepiej
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

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
