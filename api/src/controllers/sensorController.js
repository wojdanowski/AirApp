const { stationSensors } = require('../services/sensorService');

exports.stationSensorsData = async (req, res) => {
  try {
    const sensors = await stationSensors(req.params.stationId, req.query);

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
