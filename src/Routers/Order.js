const express = require("express");

const routes = express.Router();
const controler = require("../Controllers/Order");
const validate = require("../Middleware/Validate");

// CREATE DROP TABLE
routes.get("/commit", controler.commit);
routes.get("/drop", controler.drop);

routes.get(
  "/",
   validate(["admin", "customer"]),
  controler.getAll
);
routes.get(
  "/user",
   validate(["admin", "customer"]),
  controler.getByIdUser
);
routes.get(
  "/:id",
   validate(["admin", "customer"]),
  controler.getById
);
routes.post(
  "/",
   validate(["admin", "customer"]),
  controler.add
);
routes.put(
  "/",
  validate(["admin"]),
  controler.update
);
routes.delete(
  "/",
  validate(["admin"]),
  controler.delete
);

module.exports = routes;
