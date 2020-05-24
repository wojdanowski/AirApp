const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const validatePoint = (point) => {
  if (point) {
    return typeof point.lat === 'number' && typeof point.lon === 'number';
  }
  return false;
};

const degreesToRadians = (degrees) => {
  return (degrees * Math.PI) / 180;
};

const harvestineFormulaKm = (lat1, lon1, lat2, lon2) => {
  const earthRadiusKm = 6371;

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
};

exports.calcDistance = catchAsync(async (req, res, next) => {
  const { pointA, pointB } = req.body;

  if (validatePoint(pointA) && validatePoint(pointB)) {
    const distance = harvestineFormulaKm(
      pointA.lat,
      pointA.lon,
      pointB.lat,
      pointB.lon
    );

    res.status(200).json({
      status: 'success',
      data: { distance: distance },
    });
  } else {
    return next(new AppError('Incorrect points data', 422));
  }
});
