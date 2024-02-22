const express = require('express');
const router = express.Router();
const sensorLib = require("node-dht-sensor");
 
const getHumidity = () => {
    let readout = sensorLib.read(22, 24);

    return {
        label: 'humidity',
        timestamp: new Date(),
        value: readout.humidity.toFixed(1),
        stringValue: `${readout.humidity.toFixed(1)}%`
    }
}

router.get('/', (req, res) => {
    res.send(getHumidity())
});

module.exports = router;