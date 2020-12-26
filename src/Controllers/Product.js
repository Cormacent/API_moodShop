const model = require("../Models/Product");
const response = require("../Helper/respon");
const cloudUpload = require("../Helper/cloudUpload");
const { redisdb } = require("../Configs/redis");
const logger = require("../Configs/winston");

module.exports = {
  getAll: async (req, res) => {
    try {
      const result = await model.getAll();
      const saveToRedis = JSON.stringify(result);
      redisdb.setex("products", 120, saveToRedis);
      return response(res, 200, result);
    } catch (error) {
      logger.error(error.message);
      return response(res, 500, error);
    }
  },

  get: async (req, res) => {
    try {
      const result = await model.get(req.params.id);
      return response(res, 200, result);
    } catch (error) {
      logger.error(error.message);
      return response(res, 500, error);
    }
  },

  getSearch: async (req, res) => {
    try {
      const result = await model.getSearch(req.query);
      return response(res, 200, result);
    } catch (error) {
      logger.error(error.message);
      return response(res, 500, error);
    }
  },

  getSort: async (req, res) => {
    try {
      const result = await model.getSort(req.query.orderBy, req.query.sort);
      return response(res, 200, result);
    } catch (error) {
      logger.error(error.message);
      return response(res, 500, error);
    }
  },

  add: async (req, res) => {
    try {
      if (
        req.body.name === undefined ||
        req.body.price === undefined ||
        req.file === undefined ||
        req.body.id_category === undefined
      ) {
        logger.warn({
          message: "please fill in all the data provided completely",
        });
        return response(res, 200, {
          message: "please fill in all the data provided completely",
        });
      }
      req.body.image = await cloudUpload(req.file.path);
      const result = await model.add(req.body);
      redisdb.del("products");
      return response(res, 201, result);
    } catch (error) {
      logger.error(error.message);
      return response(res, 500, error);
    }
  },

  update: async (req, res) => {
    try {
      const dataDB = await model.get(req.body.id);
      if (typeof dataDB === "string") {
        logger.warn({
          message: dataDB,
        });
        return response(res, 200, {
          message: dataDB,
        });
      }
      if (req.body.price === undefined) {
        req.body.price = dataDB.price;
      }
      if (req.body.name === undefined) {
        req.body.name = dataDB.name;
      }
      if (req.body.id_category === undefined) {
        req.body.id_category = dataDB.id_category;
      }
      if (req.file === undefined) {
        req.body.image = dataDB.image;
      } else {
        req.body.image = await cloudUpload(req.file.path);
      }
      const result = await model.update(req.body);
      redisdb.del("products");
      return response(res, 201, result);
    } catch (error) {
      logger.log(error.message);
      return response(res, 500, error);
    }
  },

  delete: async (req, res) => {
    try {
      const dataDB = await model.get(req.params.id);
      if (typeof dataDB === "string") {
        logger.warn({
          message: dataDB,
        });
        return response(res, 200, {
          message: dataDB,
        });
      }
      const result = await model.delete(req.params.id);
      redisdb.del("products");
      return response(res, 200, result);
    } catch (error) {
      logger.log(error.message);
      return response(res, 500, error);
    }
  },
};
