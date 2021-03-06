const Station = require('../models/stationModel');
const DbQueryFeatures = require('../utils/dbQueryFeatures');

exports.allStations = async (query) => {
  const features = new DbQueryFeatures(Station.find(), query).limitFields();
  return await features.query;
};

exports.distinctIndexes = async () => {
  return Station.distinct('mIndexes.param');
};

exports.findNearestStation = async (query) => {
  const features = new DbQueryFeatures(
    Station.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [query.lon, query.lat],
          },
        },
      },
    }).limit(1),
    query
  ).limitFields();
  const stationList = await features.query;

  return stationList[0];
};

exports.findNearestWithDistance = async (query) => {
  const multiplier = 0.001;

  const stationList = await Station.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [query.lon * 1, query.lat * 1],
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        __v: 0,
        'location.type': 0,
      },
    },
  ]);
  return stationList[0];
};

// 1. STACJE GIOS
exports.saveGiosStationLocation = async (giosStation) => {
  try {
    let station = await Station.findOneAndUpdate(
      // TODO: funkcja powinna być ogólna.
      // Wystarczy przekazywać obiekt skonstruowany jak poniżej, a konstruować go w funkcji wywołującej
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

// TODO: funkcja powinna być ogólna
exports.saveGiosStationAirIndex = async (airIndex) => {
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
          param: m.toUpperCase(),
          sourceDataDate: airIndex[`${m}SourceDataDate`],
          calcDate: airIndex[`${m}CalcDate`],
          indexLevel: airIndex[`${m}IndexLevel`],
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
    throw Error('Air Index is empty!');
  }
};
