
var rpio = require('rpio');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const { getPinByLabel } = require('../utils.js')


// create application/json parser
var jsonParser = bodyParser.json()

/** 
 * states:
 * rpio.LOW = 0
 * rpio.HIGH = 1
 * 
 * if state is 1 (rpio.HIGH)
 * NC is ON
 * NO is OFF
 * 
 * if state is 0 (rpio.LOW)
 * NC is OFF
 * NO is ON
 */

const relayPins = require(`${process.cwd()}/config/pin_config.json`)

function setPinState ( pinNumber, state) {
    rpio.write(pinNumber, state);
}

function getPinState ( pinNumber ) {
    return rpio.read(pinNumber)
}


function init() {
    relayPins.forEach((pinData, index) => {
        const { label, initialState, pinNumber} = pinData;
        console.log(label, initialState);
        rpio.open(pinNumber, initialState);
        rpio.write(pinNumber, initialState)
    });
}

/**
 * NO  NC
 * _____.
 * |_ \_|
 */

router.get('/', (req, res) => {
    const data = []
    relayPins.forEach((pinData, index) => {
        const { label, pinNumber} = pinData;
        const val = rpio.read(pinNumber)
        data.push({
            label,
            pinNumber,
            value: val,
            NC: Boolean(val),
            NO: !val
        })
    });
    res.send(data)
});

router.get('/pin/:pinNumber', (req, res) => {
    const pinNumber = parseInt(req.params.pinNumber, 10);

    if (![24, 26, 29, 31].includes(pinNumber)) {
        res.send({pinNumber, state: 'error'})
    }
    console.log("choice id is " + req.params.pinNumber, pinNumber);
    res.send({ pinNumber, value: rpio.read(pinNumber)})
});


router.post('/setPin', jsonParser, (req, res) => {
    const { body } = req;
    const { pinNumber, state} = body;
    try {
        setPinState(pinNumber, state);
        res.sendStatus(200)
    }
    catch ({ name, message }) {
        res.send({name, message});
    }
});


router.get('/setPin/:pinNumber/:value', (req, res) => {
    const { pinNumber, value} = req.params;
    let pin;
    try {
        pin = JSON.parse(pinNumber);
    } catch {
        pin = getPinByLabel(pinNumber);
    }
    finally {
        setPinState(JSON.parse(pinNumber), JSON.parse(value));
    }

    res.sendStatus(200);
});

module.exports = {
    relayRouter: router,
    init,
    setPinState,
    getPinState
}