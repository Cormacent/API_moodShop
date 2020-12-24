const express = require("express");

const routes = express.Router();
const controler = require("../Controllers/Category");
const validate = require("../Middleware/Validate");

// END POINT /category/
routes.get("/", validate(["admin", "customer"]), controler.getAll);
routes.get("/:id", validate(["admin", "customer"]), controler.get);
routes.post("/", validate(["admin"]), controler.add);
routes.put("/", validate(["admin"]), controler.update);
routes.delete("/:id", validate(["admin"]), controler.delete);

module.exports = routes;
