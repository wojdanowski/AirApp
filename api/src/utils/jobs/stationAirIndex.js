const Gios = require('../externalApis/gios');
const {
  allStations,
  saveGiosStationAirIndex,
} = require('../../services/stationService');

const updateStationsAirIndex = async () => {
  const stations = await allStations();
  console.log(`Getting air indexes for ${stations.length} stations`);
  stations.map(async (station) => {
    switch (station.source) {
      case 'Gios':
        try {
          const airData = await Gios.getAirIndex(station.station_id);
          await saveGiosStationAirIndex(airData);
        } catch (err) {
          console.log(
            `Error updating air index for GIOS ${station.station_id}`
          );
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

exports.start = async (interval, delay) => {
  delay = delay || 0;
  interval = interval || 0;
  console.log(
    `Station air index update job started. Interval: ${interval}s Delay: ${delay}s`
  );

  (function runJobSchedule() {
    // pierwsze wykonanie od razu (z delay)
    setTimeout(updateStationsAirIndex, delay * 1000);
    // jeśli określony interval, to wywołuje się ponownie
    if (interval > 0) setTimeout(runJobSchedule, interval * 1000);
  })();
};
