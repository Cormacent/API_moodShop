require('dotenv').config();
const express = require('express');
const server = express();
const routes = require('./src/main');
const db = require('./src/Configs/db');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

server.use(bodyparser.urlencoded({ extended: false }));
server.use(bodyparser.json());
server.use(morgan('dev'));
server.use(cors());
server.use(routes);

db.connect()
  .then((res) => {
    console.log('Database Connected');
  })
  .catch((err) => {
    console.log('Database Not Connected');
    console.log(err);
  });

server.listen(8089, () => {
  console.log('service running on port 8089');
});
