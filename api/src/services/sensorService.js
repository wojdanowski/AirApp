const Sensor = require('../models/sensorModel');
const DbQueryFeatures = require('../utils/dbQueryFeatures');

exports.saveSensorData = async (sensorData, station) => {
  try {
    let newSensor = await Sensor.findOneAndUpdate(
      { key: sensorData.key, station: station._id },
      {
        values: sensorData.values,
      },
      {
        upsert: true,
        setDefaultsOnInsert: true,
        new: true,
        runValidators: true,
      }
    );
  } catch (err) {
    console.log(
      `Error when inserting sensor ${sensorData.key} for ${station._id}`
    );
    console.log(err);
  }
};

exports.stationSensors = async (stationId, query) => {
  const features = new DbQueryFeatures(
    Sensor.find({ station: stationId }),
    query
  ).limitFields();
  return await features.query;
};
