const Sensor = require('../models/sensorModel');
const DbQueryFeatures = require('../utils/dbQueryFeatures');

exports.stationSensorsData = async (req, res) => {
  try {
    const features = new DbQueryFeatures(
      Sensor.find({ station: req.params.stationId }),
      req.query
    ).limitFields();
    const sensors = await features.query;

    // const sensors = await Sensor.find({ station: req.params.stationId });
    if (sensors.length === 0) {
      res.status(404).json({
        status: 'fail',
        message: 'Sensors for station not found!',
      });
    } else {
      res.status(200).json({
        status: 'success',
        data: sensors,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
