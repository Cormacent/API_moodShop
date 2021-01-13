const express = require("express");
const cache = require("../Middleware/cache");

const routes = express.Router();
const controler = require("../Controllers/Product");
const validate = require("../Middleware/Validate");
const uploadFile = require("../Middleware/Multer");

// CREATE DROP TABLE
routes.get("/commit", controler.commit);
routes.delete("/drop", controler.drop);

routes.get(
  "/",
    validate(["admin", "customer"]),
  cache.getAllProduct,
  controler.getAll
);
routes.get(
  "/search",
  validate(["admin", "customer"]),
  controler.getSearch
);

routes.get(
  "/sort",
  validate(["admin", "customer"]),
  controler.getSort
);

routes.get(
  "/:id",
   validate(["admin", "customer"]),
  controler.getById
);

routes.post(
  "/",
    validate(["admin"]),
  uploadFile.single("image"),
  controler.add
);
routes.put(
  "/",
    validate(["admin"]),
  uploadFile.single("image"),
  controler.update
);
routes.delete(
  "/",
  validate(["admin"]),
  controler.delete
);

module.exports = routes;
