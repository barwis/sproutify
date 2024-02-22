const express = require('express');
const router = express.Router();
const sensorLib = require("node-dht-sensor");

const getTemperature = () => {

    var readout = sensorLib.read(22, 24);

    return {
        label: 'temperature',
        timestamp: new Date(),
        value: readout.temperature.toFixed(1),
        stringValue: `${readout.temperature.toFixed(1)}°C`,
    }
}

router.get('/', (req, res) => {
    res.send(getTemperature())
});

module.exports = { temperatureRouter: router, getTemperature };