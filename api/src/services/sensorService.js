const Sensor = require('../models/sensorModel');

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
    console.log(`Error when inserting sensor ${sensorData.key} for ${station._id}`);
    console.log(err);
  }
};
