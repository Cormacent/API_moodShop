const express = require("express");

const routes = express.Router();
const controler = require("../Controllers/Users");
const cache = require("../Middleware/cache");
const validate = require("../Middleware/Validate");

// CREATE DROP TABLE
routes.get("/commit", validate(["admin"]), controler.commit);
routes.delete("/drop", validate(["admin"]), controler.drop);

routes.get("/", validate(["admin"]), cache.getAllUsers, controler.getAll);
routes.post("/", controler.add);
routes.put("/", validate(["admin"]), controler.update);
routes.delete("/", validate(["admin"]), controler.delete);

module.exports = routes;
