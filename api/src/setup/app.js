const express = require('express');
const bodyParser = require('body-parser');
const env = require('./env');
const stationRouter = require('../routes/stationRoutes');
const subscriptionRouter = require('../routes/subscriptionRoutes');
const indexRouter = require('../routes/indexRoutes');
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/errorController');

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

app.use(globalErrorHandler);

module.exports = app;
