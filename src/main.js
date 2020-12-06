const express = require('express');

const routes = express.Router();
const product = require('./Routers/Product');
const category = require('./Routers/Category');

routes.use('/product', product);
routes.use('/category', category);

module.exports = routes;
