const model = require("../Models/Product");
const response = require("../Helper/respon");
const cloudUpload = require("../Helper/cloudUpload");
const { redisdb } = require("../Configs/redis");
const logger = require("../Configs/winston");

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
      redisdb.setex("products", 120, saveToRedis);
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
      logger.error(error);
      return response(res, 500, error);
    }
  },

  getSearch: async (req, res) => {
    try {
      const result = await model.getSearch(req.query);
      return response(res, 200, result);
    } catch (error) {
      logger.error(error);
      return response(res, 500, error);
    }
  },

  getSort: async (req, res) => {
    try {
      const result = await model.getSort([req.query.orderBy, req.query.sort]);
      return response(res, 200, result);
    } catch (error) {
      logger.error(error);
      return response(res, 500, error);
    }
  },

  add: async (req, res) => {
    try {
      if (
        !req.body.name ||
        !req.body.price ||
        !req.file ||
        !req.body.id_category
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
      if (req.file) {
        req.body.image = await cloudUpload(req.file.path);
      }

      const result = await model.update(req.body);
      redisdb.del("products");
      return response(res, 201, result);
    } catch (error) {
      logger.log(error);
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
      redisdb.del("products");
      return response(res, 200, result);
    } catch (error) {
      logger.log(error.message);
      return response(res, 500, error);
    }
  },
};
