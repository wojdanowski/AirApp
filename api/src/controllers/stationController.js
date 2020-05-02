const Gios = require('../utils/externalApis/gios');
const Station = require('../models/stationModel');

exports.all = async (req, res) => {
  try {
    const stations = await Station.find();

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
  const lon = req.query.lon;
  const lat = req.query.lat;
  if (lon == null || lat == null) {
    res.status(422).json({
      status: 'fail',
      message: 'Lack of required parameters (lat, lon)',
    });
    return;
  }

  try {
    let station = await findNearestStation(lon, lat);

    const airData = await Gios.getAirIndex(station.station_id);

    res.status(200).json({
      status: 'success',
      data: { station, airData },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

const findNearestStation = async (lon, lat) => {
  // bez try/catch - obsługa w metodzie nadrzędnej
  const stationList = await Station.find({
    location: {
      $nearSphere: {
        $geometry: {
          type: 'Point',
          coordinates: [lon, lat],
        },
      },
    },
  }).limit(1);
  return stationList[0];
};

exports.findNearestStation = findNearestStation;
