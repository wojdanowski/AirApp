const mongoose = require('mongoose');

exports.locationPoint = {
  type: {
    type: String,
    default: 'Point', // FIXME: coś default nie działa w update
    enum: ['Point'],
    required: true,
    select: false,
  },
  coordinates: {
    type: [Number], // lon, lat
    required: true,
  },
};

exports.mIndex = mongoose.Schema(
  {
    param: String,
    sourceDataDate: Date,
    calcDate: Date,
    indexLevel: {
      id: Number,
      indexLevelName: String,
    },
  },
  { _id: false }
);

exports.sensorValue = mongoose.Schema(
  {
    date: Date,
    value: Number,
  },
  { _id: false }
);
