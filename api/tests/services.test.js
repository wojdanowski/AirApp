const db = require('../src/setup/db');
const { saveSensorData } = require('../src/services/sensorService');
const {
  saveGiosStationLocation,
  saveGiosStationAirIndex,
} = require('../src/services/stationService');
const Sensor = require('../src/models/sensorModel');
const Station = require('../src/models/stationModel');

afterAll(async () => {
  // Closes the Mongoose connection
  await db.close();
});

describe('Sensor service', () => {
  it('Should save new sensor for station', async () => {
    const station = { _id: '5eb3f488bc7e8f9cc8d7bb0b' };
    const newSensor = {
      key: 'PM10',
      station: '5eb3f488bc7e8f9cc8d7bb0c',
      values: [
        {
          date: '2020-05-15T10:00:00.000Z',
          value: 10.6682,
        },
      ],
    };

    const oldSensors = await Sensor.find({ station: station._id });
    await saveSensorData(newSensor, station);
    const newSensors = await Sensor.find({ station: station._id });

    expect(newSensors.length).toEqual(oldSensors.length + 1);
    expect(newSensors.some((sensor) => sensor.key === 'PM10')).toBeTruthy();
  });

  it('Should update sensor for station', async () => {
    const station = { _id: '5eb3f488bc7e8f9cc8d7bb0b' };
    const existingSensor = {
      key: 'NO2',
      station: '5eb3f488bc7e8f9cc8d7bb0b',
      values: [
        {
          date: '2020-05-20T15:22:11.000Z',
          value: 12,
        },
      ],
    };

    const oldSensors = await Sensor.find({ station: station._id });
    await saveSensorData(existingSensor, station);
    const newSensors = await Sensor.find({ station: station._id });
    const savedSensor = newSensors.find((sensor) => sensor.key === 'NO2');

    expect(newSensors.length).toEqual(oldSensors.length);
    expect(savedSensor.values[0].value).toEqual(12);
  });
});

describe('Station service', () => {
  it('Should save new station location', async () => {
    const newStation = {
      id: 109,
      stationName: 'Wałbrzych - Wysockiego',
      gegrLat: '50.768729',
      gegrLon: '16.269677',
      city: {
        id: 998,
        name: 'Wałbrzych',
        commune: {
          communeName: 'Wałbrzych',
          districtName: 'Wałbrzych',
          provinceName: 'DOLNOŚLĄSKIE',
        },
      },
      addressStreet: 'ul. Wysockiego 11',
    };

    const oldStations = await Station.find();
    await saveGiosStationLocation(newStation);
    const newStations = await Station.find();

    expect(newStations.length).toEqual(oldStations.length + 1);
    const savedStation = newStations.find(
      (station) => station.name === 'Wałbrzych - Wysockiego'
    );
    expect(savedStation).toBeTruthy();
  });

  it('Should update station location', async () => {
    const oldId = '5eb3f488bc7e8f9cc8d7bb0b';
    const existingStation = {
      id: 114,
      stationName: 'Wrocław - Bartnicza edited',
      gegrLat: '51.115933',
      gegrLon: '17.141125',
      city: {
        id: 1064,
        name: 'Wrocław',
        commune: {
          communeName: 'Wrocław',
          districtName: 'Wrocław',
          provinceName: 'DOLNOŚLĄSKIE',
        },
      },
      addressStreet: 'ul. Bartnicza',
    };

    const oldStations = await Station.find();
    await saveGiosStationLocation(existingStation);
    const newStations = await Station.find();

    expect(newStations.length).toEqual(oldStations.length);
    // eslint-disable-next-line eqeqeq
    const savedStation = newStations.find((station) => station._id == oldId);
    expect(savedStation.name).toEqual('Wrocław - Bartnicza edited');
  });

  it('Should update station AirIndex', async () => {
    const _id = '5eb3f488bc7e8f9cc8d7bb0e';
    const airIndex = {
      id: 52,
      stCalcDate: '2020-05-23 08:00:00',
      stIndexLevel: {
        id: 0,
        indexLevelName: 'Bardzo dobry',
      },
      stSourceDataDate: '2020-05-23 08:00:00',
      so2CalcDate: '2020-05-23 08:00:00',
      so2IndexLevel: {
        id: 0,
        indexLevelName: 'Bardzo dobry',
      },
      so2SourceDataDate: '2020-05-23 08:00:00',
      no2CalcDate: '2020-05-23 08:00:00',
      no2IndexLevel: {
        id: 0,
        indexLevelName: 'Bardzo dobry',
      },
      no2SourceDataDate: '2020-05-23 08:00:00',
      coCalcDate: '2020-05-23 08:00:00',
      coIndexLevel: {
        id: 0,
        indexLevelName: 'Bardzo dobry',
      },
      coSourceDataDate: '2020-05-23 08:00:00',
      pm10CalcDate: '2020-05-23 08:00:00',
      pm10IndexLevel: {
        id: 0,
        indexLevelName: 'Bardzo dobry',
      },
      pm10SourceDataDate: '2020-05-23 08:00:00',
      pm25CalcDate: '2020-05-23 08:00:00',
      pm25IndexLevel: null,
      pm25SourceDataDate: null,
      o3CalcDate: '2020-05-23 08:00:00',
      o3IndexLevel: {
        id: 0,
        indexLevelName: 'Bardzo dobry',
      },
      o3SourceDataDate: '2020-05-23 08:00:00',
      c6h6CalcDate: '2020-05-23 08:00:00',
      c6h6IndexLevel: {
        id: 0,
        indexLevelName: 'Bardzo dobry',
      },
      c6h6SourceDataDate: '2020-05-23 08:00:00',
      stIndexStatus: true,
      stIndexCrParam: 'PYL',
    };

    await saveGiosStationAirIndex(airIndex);
    const newStation = await Station.findById(_id);

    console.log(newStation);

    expect(newStation.stIndex.calcDate).toEqual('2020-05-23 08:00:00');
    expect(newStation.mIndexes.length).toEqual(7);
  });
});
