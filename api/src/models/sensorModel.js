const { sensorValue } = require('./nestedSchemas');

const mongoose = require('mongoose');

const sensorSchema = mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  values: [sensorValue],
  station: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
});

const Station = (module.exports = mongoose.model('sensor', sensorSchema));
