const express = require("express");

const routes = express.Router();
const controler = require("../Controllers/History");
const validate = require("../Middleware/Validate");

// CREATE DROP TABLE
routes.get("/commit", controler.commit);
routes.delete("/drop", controler.drop);

routes.get("/", validate(["admin", "customer"]), controler.getAll);
routes.get("/:id", validate(["admin", "customer"]), controler.getById);
routes.post("/", validate(["admin", "customer"]), controler.add);
routes.put("/", validate(["admin"]), controler.update);
routes.delete("/", validate(["admin"]), controler.delete);

module.exports = routes;
