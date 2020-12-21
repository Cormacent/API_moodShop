const express = require('express');

const routes = express.Router();
const controler = require('../Controllers/Auth');

routes.post('/', controler.login);

module.exports = routes;
