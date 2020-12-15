const model = require('../Models/Product');
const response = require('../Helper/respon');
const { resolveConfig } = require('prettier');

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
      const data = req.body;
      if (
        data.name === undefined ||
        data.price === undefined ||
        data.image === undefined ||
        data.id_category === undefined
      ) {
        return response(res, 400, {
          message: 'masukkan seluruh data dengan lengkap',
        });
      }
      const result = await model.add(req.body);
      return response(res, 201, result);
    } catch (error) {
      return response(res, 500, error);
    }
  },

  update: async (req, res) => {
    try {
      const dataDB = await model.get(req.body.id);
      if (typeof dataDB === 'string') {
        return response(res, 400, {
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
      if (req.body.image === undefined) {
        req.body.image = dataDB.image;
      }
      const result = await model.update(req.body);
      return response(res, 201, result);
    } catch (error) {
      return response(res, 500, error);
    }
  },

  delete: async (req, res) => {
    try {
      const dataDB = await model.get(req.params.id);
      if (typeof dataDB === 'string') {
        return response(res, 400, {
          message: dataDB,
        });
      }
      const result = await model.delete(req.params.id);
      return response(res, 200, result);
    } catch (error) {
      return response(res, 500, error);
    }
  },
};
