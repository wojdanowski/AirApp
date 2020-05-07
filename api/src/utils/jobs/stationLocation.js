const Gios = require('../externalApis/gios');
const { saveGiosStationLocation } = require('../../services/stationService');

const updateStationsLocations = async () => {
  // stacje GIOS
  try {
    const giosStations = await Gios.getStations();
    console.log(`Got ${giosStations.length} stations from Gios`);
    giosStations.forEach((station) => {
      saveGiosStationLocation(station);
    });
  } catch (err) {
    console.log('Error when collectiong Gios stations');
    console.log(err);
  }
  // miejsce na kolejne API
};

exports.start = async (interval, delay) => {
  // setTimeout > setInterval: https://stackoverflow.com/questions/6685396/execute-the-setinterval-function-without-delay-the-first-time
  delay = delay || 0;
  interval = interval || 0;
  console.log(
    `Station location update job started. Interval: ${interval}s Delay: ${delay}s`
  );

  (function runJobSchedule() {
    // pierwsze wykonanie od razu (z delay)
    setTimeout(updateStationsLocations, delay * 1000);
    // jeśli określony interval, to wywołuje się ponownie
    if (interval > 0) setTimeout(runJobSchedule, interval * 1000);
  })();
};
