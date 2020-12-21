const model = require("../Models/Users");
const response = require("../Helper/respon");
const hashPassword = require("../Helper/hash");
const { redisdb } = require("../Configs/redis");

class Users {
  async add(req, res) {
    try {
      const data = req.body;
      if (
        data.name === undefined ||
        data.email === undefined ||
        data.password === undefined
      ) {
        logger.warn({
          message: "please fill in all the data provided completely",
        });
        return response(res, 400, {
          message: "please fill in all the data provided completely",
        });
      }
      if (data.role === undefined) {
        data.role = "customer";
      }
      const fromDB = await model.getbyEmail(data.email);
      if (typeof fromDB == "object") {
        logger.warn({
          message: "This email is already registered!",
        });
        return response(res, 401, {
          message: "This email is already registered!",
        });
      }

      const newPassword = await hashPassword(req.body.password);
      const users = {
        name: req.body.name,
        password: newPassword,
        email: req.body.email,
        role: req.body.role,
      };

      const result = await model.add(users);
      redisdb.del("users");
      return response(res, 201, result);
    } catch (error) {
      logger.error(error.message);
      return response(res, 500, error);
    }
  }

  async getAll(req, res) {
    try {
      const result = await model.getAll();
      const saveToRedis = JSON.stringify(result);
      redisdb.setex("users", 120, saveToRedis);
      return response(res, 200, result);
    } catch (error) {
      logger.error(error.message);
      return response(res, 500, error);
    }
  }

  async update(req, res) {
    try {
      const dataDB = await model.get(req.body.id);
      if (typeof dataDB === "string") {
        logger.warn({
          message: dataDB,
        });
        return response(res, 400, {
          message: dataDB,
        });
      }
      if (req.body.name === undefined) {
        req.body.name = dataDB.name;
      }
      if (req.body.email === undefined) {
        req.body.email = dataDB.email;
      }
      if (req.body.role === undefined) {
        req.body.role = dataDB.role;
      }
      if (req.body.password === undefined) {
        req.body.password = dataDB.password;
      } else {
        const newPassword = await hashPassword(req.body.password);
        req.body.password = newPassword;
      }
      redisdb.del("users");
      const result = await model.update(req.body);
      return response(res, 200, result);
    } catch (error) {
      logger.error(error.message);
      return response(res, 500, error);
    }
  }
  async delete(req, res) {
    try {
      const dataDB = await model.get(req.params.id);
      if (typeof dataDB === "string") {
        logger.warn({
          message: dataDB,
        });
        return response(res, 400, {
          message: dataDB,
        });
      }
      const result = await model.delete(req.params.id);
      redisdb.del("users");
      return response(res, 200, result);
    } catch (error) {
      return response(res, 500, error);
    }
  }
}
module.exports = new Users();