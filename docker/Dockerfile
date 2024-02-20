from node:lts-alpine

# USER 0
RUN mkdir -p /home/pi/workshop/

WORKDIR /home/pi/workshop/

COPY package.json /home/pi/workshop/
RUN npm i -g nodemon
RUN npm install
COPY . .
EXPOSE 5000
CMD ["nodemon",  "app.js"]