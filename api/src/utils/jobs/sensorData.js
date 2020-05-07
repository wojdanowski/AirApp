const Gios = require('../externalApis/gios');
const { allStations } = require('../../services/stationService');
const { saveSensorData } = require('../../services/sensorService');

const updateSensorsData = async () => {
  const stations = await allStations();
  console.log(`Getting sensors data for ${stations.length} stations`);
  // stacje GIOS
  const giosStations = stations.filter(
    (station) => station.source.toUpperCase() == 'GIOS'
  );
  //   GIOS odrzuca requesty jak idzie wszystko na raz. Dlatego for.
  for (let i = 0; i < giosStations.length; i++) {
    try {
      const stationSensors = await Gios.getStationSensors(
        giosStations[i].station_id
      );
      stationSensors.forEach(async (sensor) => {
        const sensorData = await Gios.getSensorData(sensor.id);
        await saveSensorData(sensorData, giosStations[i]);
      });
    } catch (err) {
      console.log(
        `Error updating sensors data for GIOS ${giosStations[i].station_id}`
      );
      console.log(err);
    }
  }
  // miejsce na kolejne api
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
