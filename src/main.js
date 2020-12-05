const express = require('express');

const routes = express.Router();
const product = require('./Routers/Product');
// const history = require('./Routers/History');
const kategori = require('./Routers/Kategori');

routes.use('/product', product);
// routes.use('/history', history);
routes.use('/kategori', kategori);

module.exports = routes;
