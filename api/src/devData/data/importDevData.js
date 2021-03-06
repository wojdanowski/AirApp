const fs = require('fs');
const env = require('../../setup/env');
const db = require('../../setup/db');
const Station = require('../../models/stationModel');
const Subscription = require('../../models/subscriptionModel');
const Sensor = require('../../models/sensorModel');

const fileList = [
  [`${__dirname}/stations.json`, Station],
  [`${__dirname}/sensors.json`, Sensor],
  // [`${__dirname}/subscriptions.json`, Subscription],
];

// IMPORT DATA
const importData = async (jsonData, model) => {
  try {
    await model.create(jsonData);
  } catch (err) {
    console.log(err);
  }
};

// DELETE DATA
const deleteData = async (model) => {
  try {
    await model.deleteMany();
  } catch (err) {
    console.log(err);
  }
};

// IMPORT FILES
const importFiles = async (files) => {
  if (env.NODE_ENV === 'production') {
    console.error('You are in production environment! Script aborted...');
    process.exit(1);
  } else {
    Promise.all(
      files.map(async (file) => {
        const jsonData = JSON.parse(fs.readFileSync(file[0], 'utf-8'));
        await deleteData(file[1]);
        await importData(jsonData, file[1]);
      })
    ).then(() => {
      console.log('Dev data imported');
      db.close();
    });
  }
};

importFiles(fileList);
