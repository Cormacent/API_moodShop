const express = require('express');

const routes = express.Router();
const product = require('./Routers/Product');
const category = require('./Routers/Category');
const History = require('./Routers/History');
const Users = require('./Routers/Users');
const Auth = require('./Routers/Auth');
const { cloudinaryConfig } = require('./Configs/cloudinary');

routes.use('/api/*', cloudinaryConfig);
routes.use('/api/product', product);
routes.use('/api/category', category);
routes.use('/api/history', History);
routes.use('/api/users', Users);
routes.use('/api/auth', Auth);

module.exports = routes;
