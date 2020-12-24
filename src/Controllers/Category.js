const model = require("../Models/Category");
const response = require("../Helper/respon");
const logger = require("../Configs/winston");

module.exports = {
  getAll: async (req, res) => {
    const { search } = req.query;
    let result;
    try {
      if (search) {
        result = await model.getSearch(search);
      } else {
        result = await model.getAll();
      }
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

  add: async (req, res) => {
    try {
      const data = req.body;
      if (data.name === undefined) {
        logger.warn({
          message: "please fill in all the data provided completely",
        });
        return response(res, 200, {
          message: "please fill in all the data provided completely",
        });
      }
      const result = await model.add(req.body);
      return response(res, 201, result);
    } catch (error) {
      logger.error(error.message);
      return response(err, 500, error);
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
      if (req.body.name === undefined) {
        req.body.name = dataDB.name;
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
      return response(res, 200, result);
    } catch (error) {
      logger.error(error.message);
      return response(res, 500, error);
    }
  },
};
