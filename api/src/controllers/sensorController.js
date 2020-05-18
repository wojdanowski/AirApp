const { stationSensors } = require('../services/sensorService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.stationSensorsData = catchAsync(async (req, res, next) => {
  const sensors = await stationSensors(req.params.stationId, req.query);

  if (sensors.length === 0) {
    return next(new AppError('Sensors for station not found!', 404));
  }
  res.status(200).json({
    status: 'success',
    data: sensors,
  });
});
