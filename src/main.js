const express = require('express');

const routes = express.Router();
const product = require('./Routers/Product');
// const history = require('./Routers/History');
const category = require('./Routers/Category');

routes.use('/product', product);
// routes.use('/history', history);
routes.use('/category', category);

module.exports = routes;
