const mongoose = require('mongoose');
const { sensorValue } = require('./nestedSchemas');

const sensorSchema = mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  values: [sensorValue],
  station: { type: mongoose.Schema.Types.ObjectId, ref: 'Station' },
});

module.exports = mongoose.model('sensor', sensorSchema);
