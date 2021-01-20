const response = require("../Helper/respon");
const { redisdb } = require("../Configs/redis");

module.exports = {
  getAllProduct: (req, res, next) => {
    redisdb.get("products", (err, data) => {
      if (err) {
        return response(res, 500, err);
      }
      if (data !== null) {
        const result = JSON.parse(data);
        return response(res, 200, result);
      } else {
        next();
      }
    });
  },
  getAllOrder: (req, res, next) => {
    redisdb.get("orders", (err, data) => {
      if (err) {
        return response(res, 500, err);
      }
      if (data !== null) {
        const result = JSON.parse(data);
        return response(res, 200, result);
      } else {
        next();
      }
    });
  },
  getAllUsers: (req, res, next) => {
    redisdb.get("users", (err, data) => {
      if (err) {
        return response(res, 500, err);
      }
      if (data !== null) {
        const result = JSON.parse(data);
        return response(res, 200, result);
      } else {
        next();
      }
    });
  },
};

// cache.getAllProduct = (req, res, next) => {
//   redisdb.get('products', (err, data) => {
//     if (err) {
//       return response(res, 500, err);
//     }
//     if (data !== null) {
//       const result = JSON.parse(data);
//       return response(res, 200, result);
//     } else {
//       next();
//     }
//   });
// };

// module.exports = cache;
