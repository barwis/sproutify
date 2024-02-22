## Check if your user belongs to gpio group
`groups pi` (where `pi` is the username)
it should by default, but if it doesn't add it by:
`sudo adduser pi gppio`

Edit `sudo nano /boot/firmware/config.txt` and add this line
`dtoverlay=gpio-no-irq` to prevent crashes with newer kernels when trying to poll for pin changes


## install nodemon globally
`npm i -g nodemon`

## build docker image from Dockerfile
`docker build . -t sproutify`

## run container from image:
`docker run -p 5000:5000 -v /home/pi/workspace/sproutify/src:/home/pi/workshop/src -it sproutify`


## Raspberry Pi 4 B pinout:

        3v3 power -  [1]  [2] - 5V power
     GPIO 2 (SDA) -  [3]  [4] - 5V power
     GPIO 3 (SCL) -  [5]  [6] - Ground
  GPIO 4 (GPCLK0) -  [7]  [8] - GPIO 14 (TXD)
           Ground -  [9] [10] - GPIO 15 (RXD)
          GPIO 17 - [11] [12] - GPIO 18 (PCM_CLK)
          GPIO 27 - [13] [14] - Ground
          GPIO 22 - [15] [16] - GPIO 23
        3v3 power - [17] [18] - GPIO 24
   GPIO 10 (MOSI) - [19] [20] - Ground
    GPIO 9 (MISO) - [21] [22] - GPIO 25
   GPIO 11 (SCLK) - [23] [24] - GPIO 8 (CE0)
           Ground - [25] [26] - GPIO 7 (CE1)
   GPIO 0 (ID_SD) - [27] [28] - GPIO 1 (ID_SC)
           GPIO 5 - [29] [30] - Ground
           GPIO 6 - [31] [32] - GPIO 12 (PWM0)
   GPIO 13 (PWM1) - [33] [34] - Ground

 GPIO 19 (PCM_FS) - [35] [36] - GPIO 16
          GPIO 26 - [37] [38] - GPIO 20 (PCM_DIN)
           Ground - [39] [40] = GPIO 21 (PCM_DOUT)


## Connections

1. RPi case fan 
   VCC - [2]
   GND - [39]


2. Temperature and humidity sensor
   VCC - [17]
   SIG - [18] (GPIO 24)
   GND - [20]

3. o2c Oled display
   VCC - [1]
   SDA - [3]
   SCL - [5]
         [7]
   GND - [9]

4. Relay board

   VCC - [4]
   GND - [6]

   IN1 - [22]
   IN2 - [24]
   IN3 - [26]
   IN4 - [28]
