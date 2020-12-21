const express = require('express');

const routes = express.Router();
const controler = require('../Controllers/Users');
const cache = require('../Middleware/cache');
const validate = require('../Middleware/Validate');

routes.get(
  '/',
  validate(['admin']),
  cache.getAllUsers,
  controler.getAll,
);
routes.post('/', validate(['admin']), controler.add);
routes.put('/', validate(['admin']), controler.update);
routes.delete('/:id', validate(['admin']), controler.delete);

module.exports = routes;
