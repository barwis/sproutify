from nikolaik/python-nodejs:latest

# USER 0

RUN mkdir -p /home/pi/
WORKDIR /home/pi/workshop/

RUN npm i -g nodemon


COPY package.json /home/pn/workshop/
RUN npm install
COPY . .
EXPOSE 5000
CMD ["nodemon",  "app.js"]