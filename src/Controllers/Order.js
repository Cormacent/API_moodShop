const model = require("../Models/Order");
const response = require("../Helper/respon");
const logger = require("../Configs/winston");

module.exports = {
  commit: async (req, res) => {
    try {
      const result = await model.commit();
      return response(res, 200, result);
    } catch (error) {
      logger.error(error.message);
      return response(res, 500, error);
    }
  },

  drop: async (req, res) => {
    try {
      const result = await model.drop();
      return response(res, 200, result);
    } catch (error) {
      logger.error(error.message);
      return response(res, 500, error);
    }
  },

  getAll: async (req, res) => {
    try {
      const result = await model.getAll();
      return response(res, 200, result);
    } catch (error) {
      logger.error(error);
      return response(res, 500, error);
    }
  },

  getByIdUser: async (req, res) => {
    try {
      console.log(req);
      const result = await model.getByIdUser(req.query.id_user);
      return response(res, 200, result);
    } catch (error) {
      logger.error(error.message);
      return response(res, 500, error);
    }
  },

  getById: async (req, res) => {
    try {
      const result = await model.getById(req.params.id);
      return response(res, 200, result);
    } catch (error) {
      logger.error(error.message);
      return response(res, 500, error);
    }
  },

  add: async (req, res) => {
    try {
      if (
        !req.body.id_user ||
        !req.body.price ||
        !req.body.amount ||
        !req.body.invoice ||
        !req.body.payment
      ) {
        logger.warn({
          message: "please fill in all the data provided completely",
        });
        return response(res, 200, {
          message: "please fill in all the data provided completely",
        });
      }
      if (!req.body.status) {
        req.body.status = "unpaid";
      }

      const result = await model.add(req.body);
      return response(res, 201, result);
    } catch (error) {
      logger.error(error);
      return response(res, 500, error);
    }
  },

  update: async (req, res) => {
    try {
      if (!req.body.id) {
        logger.warn({
          message: "id not declare",
        });
        return response(res, 200, {
          message: "id not declare",
        });
      }
      const dataDB = await model.getById(req.body.id);
      if (!dataDB) {
        logger.warn({
          message: "id not found!",
        });
        return response(res, 200, {
          message: "id not found!",
        });
      }
      const result = await model.update(req.body);
      return response(res, 201, result);
    } catch (error) {
      logger.error(error.message);
      return response(res, 500, error);
    }
  },

  delete: async (req, res) => {
    try {
      if (!req.query.id) {
        logger.warn({
          message: "id not declare",
        });
        return response(res, 200, {
          message: "id not declare",
        });
      }
      const dataDB = await model.getById(req.query.id);
      if (!dataDB) {
        logger.warn({
          message: "id not found!",
        });
        return response(res, 200, {
          message: "id not found!",
        });
      }
      const result = await model.delete(req.query.id);
      return response(res, 200, result);
    } catch (error) {
      logger.error(error.message);
      return response(res, 500, error);
    }
  },
};
