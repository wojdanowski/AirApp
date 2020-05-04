const env = require('../../setup/env');
const Gios = require('../externalApis/gios');
const Station = require('../../models/stationModel');

// 1. STACJE GIOS
const saveGiosStationLocation = async (giosStation) => {
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

const saveGiosStationAirIndex = async (airIndex) => {
  if (airIndex.id) {
    const keyPart = 'IndexLevel';
    const measurements = Object.keys(airIndex)
      .filter((element) => element.includes(keyPart))
      .map((element) => element.replace(keyPart, ''))
      .filter((element) => !element.includes('st'));

    const stIndex = {
      indexLevel: airIndex.stIndexLevel,
      calcDate: airIndex.stCalcDate,
      sourceDataDate: airIndex.stSourceDataDate,
      indexStatus: airIndex.stIndexStatus,
      indexParam: airIndex.stIndexCrParam,
    };

    const mIndexes = [];
    measurements.forEach((m) => {
      if (airIndex[m + keyPart]) {
        const index = {
          param: m,
          sourceDataDate: airIndex[m + 'SourceDataDate'],
          calcDate: airIndex[m + 'CalcDate'],
          indexLevel: airIndex[m + 'IndexLevel'],
        };
        mIndexes.push(index);
      }
    });

    let station = await Station.findOneAndUpdate(
      { station_id: airIndex.id },
      {
        stIndex: stIndex,
        mIndexes: mIndexes,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } else {
    throw 'Air Index is empty!';
  }
};

// AKTUALIZACJA WSZYSTKICH STACJI
const updateStationsLocations = async () => {
  // stacje GIOS
  const giosStations = await Gios.getStations();
  console.log(`Got ${giosStations.length} stations from Gios`);
  giosStations.map((station) => saveGiosStationLocation(station));
};

const updateStationsAirData = async () => {
  const stations = await Station.find();
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
  (function runLocationsSchedule() {
    updateStationsLocations();
    setTimeout(runLocationsSchedule, stationDelay);
  })();

  (function runAirDataSchedule() {
    updateStationsAirData();
    setTimeout(runAirDataSchedule, airDataDelay);
  })();
};
