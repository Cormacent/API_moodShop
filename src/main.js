const express = require('express');

const routes = express.Router();
const product = require('./Routers/Product');
const category = require('./Routers/Category');
const History = require('./Routers/History');

routes.use('/product', product);
routes.use('/category', category);
routes.use('/history', History);

module.exports = routes;
