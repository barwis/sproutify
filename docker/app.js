const express = require('express');
const appRouter = require('./src/router.js');
const rpio = require('rpio');
const app = express();
const ip = require("ip");
const os = require("os");
const cron = require('node-cron');

const { init, setPinState, getPinState } = require('./src/relay/relay-controller.js');
const { getTemperature } = require('./src/temp/temperature-controller.js');

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}, IP: ${ip.address()}, host: ${os.hostname()}`));


init();

app.get("/api/health", (req, res) => {
  res.sendStatus(200);
});

appRouter(app);

const pinStatus = {
  'grow lights 1': 0,
  'grow lights 2': 0,
  'heater': 0,
  'fan': 0
}

function getCurrentDate() {
  const now = new Date();
  const hrs = now.getHours();
  return hrs
}


cron.schedule('* * * * *', () => {
  const now = new Date();
  const hrs = now.getHours();
  console.log('running a task every minute', 'temp', getTemperature().stringValue);

  // turn lamp on between 6 and 22
  if (hrs >= 6 && hrs < 22 ) {
    setPinState(29, 0);
    setPinState(31, 0)
  } else {
    setPinState(29, 1);
    setPinState(31, 1)
  }


  const temp = getTemperature().value;
  if (temp < 18) {
    setPinState(26, 0);
  }
  if (temp > 23) {
    setPinState(26, 1);
  }

});