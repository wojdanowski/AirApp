const fs = require('fs');
const env = require('../../setup/env');
const db = require('../../setup/db');
const Station = require('../../models/stationModel');
const Subscription = require('../../models/subscriptionModel');
const Sensor = require('../../models/sensorModel');

const fileList = [
  ['stations.json', Station],
  //   ['sensors.json', Sensor],
  //   ['subscriptions.json', Subscription],
];

// IMPORT DATA
const importData = async (jsonData, model) => {
  try {
    await Station.create(jsonData);
    console.log(`${model.name} data imported`);
  } catch (err) {
    console.log(err);
  }
};

// DELETE ALL DATA
const deleteData = async (model) => {
  try {
    await model.deleteMany();
    console.log(`${model.name} data deleted`);
  } catch (err) {
    console.log(err);
  }
};

if (env.NODE_ENV === 'production') {
  console.error('You are in production environment! Script aborted...');
  process.exit(1);
} else {
  fileList.forEach(async (file) => {
    const jsonData = JSON.parse(fs.readFileSync(file[0], 'utf-8'));
    await deleteData(file[1]);
    await importData(jsonData, file[1]);
  });
}
