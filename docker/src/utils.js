const relayPins = require(`${process.cwd()}/config/pin_config.json`)

function getPinByLabel(label) {
    relayPins.find(pin => pin.label === label)
}

module.exports =  { getPinByLabel };