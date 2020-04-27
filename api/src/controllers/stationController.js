const Gios = require('../utils/giosApi');
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

  // TODO: duplikat z notifications
  try {
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
    let station = stationList[0];

    Gios.getAirIndex(station.station_id, (airData) => {
      res.status(200).json({
        status: 'success',
        data: { station, airData },
      });
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
