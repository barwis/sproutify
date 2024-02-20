const getHumidity = require('./humi/humidity-controller.js')
const getTemperature = require('./temp/temperature-controller.js')



const routes = [
    {
      path: 'humi',
      controller: getHumidity
    },
    {
      path: 'temp',
      controller: getTemperature
    }
];

const appRouter = (app) => {
    routes.map((route) => {
        const { path, controller} = route;
        app.get(`/api/${path}`, (req, res) => {
          const data = controller();
          res.send(data)
        });
    });
}

module.exports = appRouter;