const express = require("express");

const routes = express.Router();
const controler = require("../Controllers/Users");
const cache = require("../Middleware/cache");
const validate = require("../Middleware/Validate");

routes.get("api/", validate(["admin"]), cache.getAllUsers, controler.getAll);
routes.post("api/", controler.add);
routes.put("api/", validate(["admin"]), controler.update);
routes.delete("api/:id", validate(["admin"]), controler.delete);

module.exports = routes;
