const env = require('.././env');
const Gios = require('./giosApi');
const Station = require('../models/stationModel');

const saveGiosStation = async (giosStation) => {
  try {
    let station = await Station.findOneAndUpdate(
      { station_id: giosStation.id },
      {
        source: 'Gios',
        lat: giosStation.gegrLat,
        lon: giosStation.gegrLon,
        name: giosStation.stationName,
      },
      { upsert: true, new: true, runValidators: true }
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
  //   console.log(`Station update scheduled: ${env.UPDATESCHEDULE}`);
  //   updateGiosStations(env.UPDATESCHEDULE);
  //   setInterval(updateGiosStations, env.UPDATESCHEDULE);
  // TODO: setTimeout lepszy: https://stackoverflow.com/questions/6685396/execute-the-setinterval-function-without-delay-the-first-time
  delay = env.UPDATESCHEDULE;
  console.log(`Station update scheduled: ${delay}`);
  (function runSchedule() {
    updateGiosStations();
    setTimeout(runSchedule, delay);
  })();
};
