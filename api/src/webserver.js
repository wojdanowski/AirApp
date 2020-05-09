// modules
const env = require('./setup/env');
const db = require('./setup/db');
const apiRoutes = require('./routes/api-routes');

const express = require('express');
const bodyParser = require('body-parser');

// APP
const app = express();

// MIDDLEWARE
if (env.NODE_ENV !== 'production') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// TODO: ogarnąć lepiej
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// ROUTES
app.get('/', (req, res) => {
  res.send('Server is up.');
});
app.use('/api', apiRoutes);

// RUN
console.log(`Environment: ${env.NODE_ENV}`);
app.listen(env.PORT, function () {
  console.log('Running on port ' + env.PORT);
});
