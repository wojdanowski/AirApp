const env = require('../../setup/env');
const Gios = require('../externalApis/gios');
const {
  allStations,
  saveGiosStationLocation,
  saveGiosStationAirIndex,
} = require('../../services/stationService');

const updateStationsLocations = async () => {
  // stacje GIOS
  const giosStations = await Gios.getStations();
  console.log(`Got ${giosStations.length} stations from Gios`);
  giosStations.map((station) => saveGiosStationLocation(station));
  // miejsce na kolejne API
};

const updateStationsAirData = async () => {
  const stations = await allStations();
  console.log(`Getting air data for ${stations.length} stations`);
  stations.map(async (station) => {
    switch (station.source) {
      case 'Gios':
        try {
          const airData = await Gios.getAirIndex(station.station_id);
          await saveGiosStationAirIndex(airData);
        } catch (err) {
          console.log(`Error updating air data for ${station.station_id}`);
          console.log(err);
        }
        break;
      // miejsce na kolejne API
      default:
        console.log(
          `Unknown station source '${station.source}' for station ${station._id}`
        );
        break;
    }
  });
};

exports.start = async () => {
  // setTimeout > setInterval: https://stackoverflow.com/questions/6685396/execute-the-setinterval-function-without-delay-the-first-time
  const stationDelay = env.STATIONSCHEDULE;
  const airDataDelay = env.AIRDATASCHEDULE;
  console.log(
    `Station update job started. \nLocation interval: ${stationDelay}\nData interval: ${airDataDelay}`
  );
  // lista stacji
  (function runLocationsSchedule() {
    updateStationsLocations();
    setTimeout(runLocationsSchedule, stationDelay);
  })();
  // indeksy powietrza
  (function runAirDataSchedule() {
    updateStationsAirData();
    setTimeout(runAirDataSchedule, airDataDelay);
  })();
};
