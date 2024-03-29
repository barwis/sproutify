var sensor = require("node-dht-sensor");
var i2c = require('i2c-bus'),
  i2cBus = i2c.openSync(1),
  oled = require('oled-i2c-bus');

var font = require('oled-font-5x7');

  var opts = {
    width: 128,
    height: 32,
    address: 0x3C
  };

var oled = new oled(i2cBus, opts);
oled.clearDisplay();
oled.turnOnDisplay();

// oled.setCursor(1, 1);
// oled.writeString(font, 1, 'Cats and dogs are really cool animals, you know.', 1, true);
oled.update();

sensor.read(22, 4, function(err, temperature, humidity) {
  if (!err) {
    console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
  }
});