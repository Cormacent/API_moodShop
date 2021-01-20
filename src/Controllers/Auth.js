const model = require("../Models/Users");
const response = require("../Helper/respon");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../Configs/winston");

class Auth {
  login = async (req, res) => {
    try {
      if (!req.body.email || !req.body.password) {
        logger.warn({
          message: "please fill in all the data provided completely",
        });
        return response(res, 200, {
          message: "please fill in all the data provided completely",
        });
      }

      const fromDB = await model.getByEmail(req.body.email);
      if (!fromDB) {
        logger.warn({
          message: "email not registered",
        });
        return response(res, 200, {
          status: false,
          message: "email not registered",
        });
      }

      const passUser = req.body.password;
      const check = await bcrypt.compare(passUser, fromDB.password);

      if (check) {
        const result = await this.setToken(fromDB);
        return response(res, 200, {
          status: true,
          message: "You Pass!",
          result,
        });
      } else {
        logger.warn({
          message: "You shall not pass with that password!",
        });
        return response(res, 200, {
          message: "You shall not pass with that password!",
        });
      }
    } catch (error) {
      logger.error(error);
      return response(res, 500, error);
    }
  };

  setToken = async (data) => {
    try {
      const payload = {
        email: data.email,
        role: data.role,
      };
      const token = jwt.sign(payload, process.env.JWT_KEYS, {
        expiresIn: "1h",
      });

      const result = {
        message: "Token created",
        token: token,
        role: data.role,
        id: data.id,
        email: data.email,
        username: data.name,
      };
      return result;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new Auth();
