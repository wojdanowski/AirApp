const Gios = require('../externalApis/gios');
const { allStations } = require('../../services/stationService');
const { saveSensorData } = require('../../services/sensorService');

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
          // FIXME: wymagany jest jakieś opóźnienie pomiędzy zapytaniami. GIOS odrzuca requesty jak idzie wszystko na raz
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

exports.start = async (interval, delay) => {
  delay = delay || 0;
  interval = interval || 0;
  console.log(
    `Sensor data update job started. Interval: ${interval}s Delay: ${delay}s`
  );

  (function runJobSchedule() {
    // pierwsze wykonanie od razu (z delay)
    setTimeout(updateSensorsData, delay * 1000);
    // jeśli określony interval, to wywołuje się ponownie
    if (interval > 0) setTimeout(runJobSchedule, interval * 1000);
  })();
};
