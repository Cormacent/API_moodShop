const response = require("../Helper/respon");
const jwt = require("jsonwebtoken");
const respon = require("../Helper/respon");

const checkToken = (roles) => {
  return function (req, res, next) {
    const { authtoken } = req.headers;
    let flagToken = false;
    if (!authtoken) {
      logger.warn({
        message: "please login first!",
      });
      return response(res, 401, {
        message: "please login first!",
      });
    }
    jwt.verify(authtoken, process.env.JWT_KEYS, (err, decode) => {
      if (err) {
        logger.error(err.message);
        return respon(res, 401, err);
      }
      roles.map((role) => {
        if (role == decode.role) {
          flagToken = true;
        }
      });
      if (flagToken) {
        next();
      } else {
        logger.warn({
          message: `You don't have permission to access`,
        });
        return response(res, 401, {
          message: `You don't have permission to access`,
        });
      }
    });
  };
};

module.exports = checkToken;
