const {
  allStations,
  distinctIndexes,
  findNearestStation,
} = require('../services/stationService');

exports.all = async (req, res) => {
  try {
    const stations = await allStations(req.query);

    res.status(200).json({
      status: 'success',
      data: { stations },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.nearestAirIndex = async (req, res) => {
  if (req.query.lon == null || req.query.lat == null) {
    res.status(422).json({
      status: 'fail',
      message: 'Lack of required parameters (lat, lon)',
    });
    return;
  }

  try {
    let station = await findNearestStation(req.query);

    res.status(200).json({
      status: 'success',
      data: { station },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.indexList = async (req, res) => {
  try {
    const indexes = await distinctIndexes();

    res.status(200).json({
      status: 'success',
      data: { indexes },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
