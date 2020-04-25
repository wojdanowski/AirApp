const env = require('.././env');
const Gios = require('./giosApi');
const Station = require('../models/stationModel');

const saveGiosStation = async (giosStation) => {
  try {
    let station = await Station.findOneAndUpdate(
      { station_id: giosStation.id },
      {
        source: 'Gios',
        location: {
          type: 'Point',
          coordinates: [giosStation.gegrLon, giosStation.gegrLat],
        },
        name: giosStation.stationName,
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
      `Error when inserting station ${giosStation.id}, ${giosStation.stationName}`
    );
    console.log(err);
  }
};

const saveAllGiosStations = (giosStations) => {
  console.log('Gios stations ' + giosStations.length);
  giosStations.map((station) => saveGiosStation(station));
};

const updateGiosStations = async () => {
  Gios.getStations(saveAllGiosStations);
};

exports.scheduleUpdateStations = async () => {
  // setTimeout > setInterval: https://stackoverflow.com/questions/6685396/execute-the-setinterval-function-without-delay-the-first-time
  delay = env.UPDATESCHEDULE;
  console.log(`Station update scheduled: ${delay}`);
  (function runSchedule() {
    updateGiosStations();
    setTimeout(runSchedule, delay);
  })();
};
