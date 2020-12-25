const express = require("express");
const cache = require("../Middleware/cache");

const routes = express.Router();
const controler = require("../Controllers/Product");
const validate = require("../Middleware/Validate");
const uploadFile = require("../Middleware/Multer");

// END POINT /product/
routes.get(
  "api/",
  validate(["admin", "customer"]),
  cache.getAllProduct,
  controler.getAll
);
routes.get("api/:id", validate(["admin", "customer"]), controler.get);
routes.post(
  "api/",
  validate(["admin"]),
  uploadFile.single("image"),
  controler.add
);
routes.put(
  "api/",
  validate(["admin"]),
  uploadFile.single("image"),
  controler.update
);
routes.delete("api/:id", validate(["admin"]), controler.delete);

module.exports = routes;
