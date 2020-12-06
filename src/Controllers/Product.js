const model = require('../Models/Product');
const response = require('../Helper/respon');

module.exports = {
  getAll: async (req, res) => {
    const { search } = req.query;
    const { orderBy, sort } = req.query;
    let result;
    try {
      if (search) {
        result = await model.getSearch(search);
      } else if (orderBy) {
        result = await model.getSort(orderBy, sort);
      } else {
        result = await model.getAll();
      }
      return response(res, 200, result);
    } catch (error) {
      return response(res, 500, error);
    }
  },

  get: async (req, res) => {
    try {
      const result = await model.get(req.params.id);
      return response(res, 200, result);
    } catch (error) {
      return response(res, 500, error);
    }
  },

  add: async (req, res) => {
    try {
      const result = await model.add(req.body);
      return response(res, 201, result);
    } catch (error) {
      return response(err, 500, error);
    }
  },

  update: async (req, res) => {
    try {
      const result = await model.update(req.body);
      return response(res, 201, result);
    } catch (error) {
      return response(res, 500, error);
    }
  },

  delete: (req, res) => {
    try {
      const result = model.delete(req.params.id);
      return response(res, 200, result);
    } catch (error) {
      return response(res, 500, error);
    }
  },
};
