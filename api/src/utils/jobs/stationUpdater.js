const env = require('../../setup/env');
const Gios = require('../externalApis/gios');
const {
  allStations,
  saveGiosStationLocation,
  saveGiosStationAirIndex,
} = require('../../services/stationService');
const { saveSensorData } = require('../../services/sensorService');

const updateStationsLocations = async () => {
  // stacje GIOS
  const giosStations = await Gios.getStations();
  console.log(`Got ${giosStations.length} stations from Gios`);
  giosStations.map((station) => saveGiosStationLocation(station));
  // miejsce na kolejne API
};

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

const updateSensorsData = async () => {
  const stations = await allStations();
  console.log(`Getting sensors data for ${stations.length} stations`);
  stations.map(async (station) => {
    switch (station.source) {
      case 'Gios':
        try {
          const stationSensors = await Gios.getStationSensors(
            station.station_id
          );
          stationSensors.map(async (sensor) => {
            const sensorData = await Gios.getSensorData(sensor.id);
            await saveSensorData(sensorData, station);
          });
        } catch (err) {
          console.log(
            `Error updating sensors data for GIOS ${station.station_id}`
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

// TODO: wydzielić o osbnych modułów każdy job
exports.start = async () => {
  // setTimeout > setInterval: https://stackoverflow.com/questions/6685396/execute-the-setinterval-function-without-delay-the-first-time
  const stationDelay = env.STATIONSCHEDULE;
  const airDataDelay = env.AIRDATASCHEDULE;
  console.log(
    `Station update job started. \nLocation interval: ${stationDelay}\nData interval: ${airDataDelay}`
  );

  // FIXME: wymagany jest jakiś offset pomiędzy jobami. GIOS odrzuca część requestów jak idzie wszystko na raz
  // lista stacji
  (function runLocationsSchedule() {
    updateStationsLocations();
    setTimeout(runLocationsSchedule, stationDelay);
  })();
  // indeksy powietrza
  (function runAirDataSchedule() {
    const offset = 1000 * 60 * 2;
    updateStationsAirIndex();
    setTimeout(runAirDataSchedule, airDataDelay);
  })();
  // dane z sensorów
  (function runSensorDataSchedule() {
    const offset = 1000 * 60 * 4;
    updateSensorsData();
    setTimeout(runSensorDataSchedule, airDataDelay);
  })();
};
