const express = require('express');

const routes = express.Router();
const product = require('./Routers/Product');
const category = require('./Routers/Category');
const History = require('./Routers/History');
const Users = require('./Routers/Users');
const Auth = require('./Routers/Auth');
const { cloudinaryConfig } = require('./Configs/cloudinary');

routes.use('*', cloudinaryConfig);
routes.use('/product', product);
routes.use('/category', category);
routes.use('/history', History);
routes.use('/users', Users);
routes.use('/auth', Auth);

module.exports = routes;
