const mongoose = require('mongoose');

exports.locationPoint = mongoose.Schema(
  {
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
  },
  { _id: false }
);

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

const toInteger = (number) => {
  return Math.floor(number); // zamienić na integer
};

exports.subscriptionTime = mongoose.Schema(
  {
    weekDay: {
      type: Number,
      required: true,
      min: 0,
      max: 6,
    },
    hour: {
      type: Number,
      required: true,
      min: 1,
      max: 24,
    },
    minutes: {
      type: Number,
      default: 0,
      min: 0,
      max: 60,
      set: (num) => toInteger(num),
    },
  },
  { _id: false }
);
