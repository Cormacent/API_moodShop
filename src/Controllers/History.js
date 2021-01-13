const model = require("../Models/History");
const response = require("../Helper/respon");
const logger = require("../Configs/winston");
const { redisdb } = require("../Configs/redis");

module.exports = {
  commit: async (req, res) => {
    try {
      const result = await model.commit();
      return response(res, 200, result);
    } catch (error) {
      return response(res, 500, error);
    }
  },

  drop: async (req, res) => {
    try {
      const result = await model.drop();
      return response(res, 200, result);
    } catch (error) {
      return response(res, 500, error);
    }
  },

  getAll: async (req, res) => {
    try {
      const result = await model.getAll();
      const saveToRedis = JSON.stringify(result);
      redisdb.setex("historys", 120, saveToRedis);
      return response(res, 200, result);
    } catch (error) {
      logger.error(error);
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
        !req.body.amount ||
        !req.body.invoice ||
        !req.body.cashier ||
        !req.body.name_product
      ) {
        logger.warn({
          message: "please fill in all the data provided completely",
        });
        return response(res, 200, {
          message: "please fill in all the data provided completely",
        });
      }

      const result = await model.add(req.body);
      redisdb.del("historys");
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
      redisdb.del("historys");
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
      redisdb.del("historys");
      return response(res, 200, result);
    } catch (error) {
      logger.error(error.message);
      return response(res, 500, error);
    }
  },
};
