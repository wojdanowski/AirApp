const env = require('./setup/env');
const db = require('./setup/db');
const app = require('./setup/app')

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION. Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// RUN
console.log(`Environment: ${env.NODE_ENV}`);
const server = app.listen(env.PORT, function () {
  console.log(`Running on port ${env.PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION. Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
