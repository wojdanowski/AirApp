const {
  allStations,
  distinctIndexes,
  findNearestStation,
} = require('../services/stationService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.all = catchAsync(async (req, res, next) => {
  const stations = await allStations(req.query);

  res.status(200).json({
    status: 'success',
    data: { stations },
  });
});

exports.nearestAirIndex = catchAsync(async (req, res, next) => {
  if (req.query.lon == null || req.query.lat == null) {
    return next(new AppError('Lack of required parameters (lat, lon)', 422));
  }

  const station = await findNearestStation(req.query);

  res.status(200).json({
    status: 'success',
    data: { station },
  });
});

exports.indexList = catchAsync(async (req, res, next) => {
  const indexes = await distinctIndexes();

  res.status(200).json({
    status: 'success',
    data: { indexes },
  });
});
