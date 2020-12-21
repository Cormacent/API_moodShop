const model = require("../Models/Users");
const response = require("../Helper/respon");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../Configs/winston");

class Auth {
  login = async (req, res) => {
    try {
      if (req.body.email === undefined || req.body.password === undefined) {
        logger.warn({
          message: "please fill in all the data provided completely",
        });
        return response(res, 400, {
          message: "please fill in all the data provided completely",
        });
      }

      const { password, email, role } = await model.getbyEmail(req.body.email);
      if (email === undefined) {
        logger.warn({
          message: "email not registered",
        });
        return response(res, 400, {
          message: "email not registered",
        });
      }

      const passUser = req.body.password;
      const check = await bcrypt.compare(passUser, password);

      if (check) {
        const result = await this.setToken(email, role);
        return response(res, 200, { message: "You Pass!", result });
      } else {
        logger.warn({
          message: "You shall not pass with that password!",
        });
        return response(res, 200, {
          message: "You shall not pass with that password!",
        });
      }
    } catch (error) {
      logger.error(error.message);
      return response(res, 500, error);
    }
  };

  setToken = async (email, role) => {
    try {
      const payload = {
        email: email,
        role: role,
      };
      const token = jwt.sign(payload, process.env.JWT_KEYS, {
        expiresIn: "1h",
      });

      const result = {
        message: "Token created",
        token: token,
      };
      return result;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new Auth();
