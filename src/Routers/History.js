const express = require('express');

const routes = express.Router();
const controler = require('../Controllers/History');

// END POINT /category/
routes.get('/', controler.getAll);
routes.get('/:id', controler.get);
routes.post('/', controler.add);
routes.put('/', controler.update);
routes.delete('/:id', controler.delete);

module.exports = routes;
