// modules
const express = require('express');
const bodyParser = require('body-parser');
const env = require('./setup/env');
const db = require('./setup/db');
const stationRouter = require('./routes/stationRoutes');
const subscriptionRouter = require('./routes/subscriptionRoutes');
const indexRouter = require('./routes/indexRoutes');
const AppError = require('./utils/appError');
const errorController = require('./controllers/errorController');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION. Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// APP
const app = express();

// MIDDLEWARE
if (env.NODE_ENV !== 'production') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // TODO: ogarnąć lepiej
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
app.use('/api/subscriptions', subscriptionRouter);
app.use('/api/stations', stationRouter);
app.use('/api', indexRouter);

// UNHANDLED ROUTES
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(errorController);

// RUN
console.log(`Environment: ${env.NODE_ENV}`);
const server = app.listen(env.PORT, function () {
  console.log(`Running on port ${env.PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION. Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
