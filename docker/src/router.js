const humidityRouter = require('./humi/humidity-controller.js')
const { temperatureRouter } = require('./temp/temperature-controller.js')
const relayController = require('./relay/relay-controller.js');

const { relayRouter } = relayController;


const appRouter = (app) => {

    app.use('/api/humidity', humidityRouter)
    app.use('/api/temperature', temperatureRouter)
    app.use('/api/relay', relayRouter)

}

module.exports = appRouter;