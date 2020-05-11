const {
  allStations,
  distinctIndexes,
  findNearestStation,
} = require('../services/stationService');
const catchAsync = require('../utils/catchAsync');

exports.all = catchAsync(async (req, res, next) => {
  const stations = await allStations(req.query);

  res.status(200).json({
    status: 'success',
    data: { stations },
  });
});

exports.nearestAirIndex = catchAsync(async (req, res, next) => {
  if (req.query.lon == null || req.query.lat == null) {
    res.status(422).json({
      status: 'fail',
      message: 'Lack of required parameters (lat, lon)',
    });
    return;
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
