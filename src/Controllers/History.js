const model = require("../Models/History");
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
      console.log(req.body);
      if (
        data.amount === undefined ||
        data.invoice === undefined ||
        data.cashier === undefined ||
        data.name_product === undefined
      ) {
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
      if (req.body.amount === undefined) {
        req.body.amount = dataDB.amount;
      }
      if (req.body.invoice === undefined) {
        req.body.invoice = dataDB.invoice;
      }
      if (req.body.date === undefined) {
        req.body.date = dataDB.date;
      }
      if (req.body.cashier === undefined) {
        req.body.cashier = dataDB.cashier;
      }
      if (req.body.name_product === undefined) {
        req.body.name_product = dataDB.name_product;
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
