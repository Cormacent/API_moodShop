const express = require('express');

const routes = express.Router();
const product = require('./Routers/Product');
const category = require('./Routers/Category');
const Order = require('./Routers/Order');
const OrderItem = require('./Routers/OrderItem');
const Users = require('./Routers/Users');
const Auth = require('./Routers/Auth');
const { cloudinaryConfig } = require('./Configs/cloudinary');

routes.use('*', cloudinaryConfig);
routes.use('/product', product);
routes.use('/category', category);
routes.use('/order', Order);
routes.use('/orderitem', OrderItem);
routes.use('/users', Users);
routes.use('/auth', Auth);

module.exports = routes;
