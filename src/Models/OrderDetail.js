const db = require("../Configs/db");
const Sequelize = require("sequelize");
const tb_order = require("./Order");
const tb_product = require("./Product");

module.exports = new (class OrderDetail {
  constructor() {
    this.OrderDetail = db.sequelize.define("orderdetails", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id_product: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "products",
          key: "id",
        },
      },
      id_order: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "orders",
          key: "id",
        },
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
    this.OrderDetail.belongsTo(tb_product.Product, {
      foreignKey: "id_product",
      as: "products",
    });
    this.OrderDetail.belongsTo(tb_order.Order, {
      foreignKey: "id_order",
      as: "orders",
    });
  }

  async commit() {
    return new Promise((resolve, reject) => {
      if (process.env.MODE === "DEV") {
        this.OrderDetail.sync()
          .then(() => {
            resolve("Table Orderdetails Created!");
          })
          .catch((e) => {
            console.log(e);
            reject(e);
          });
      } else {
        reject("You shall not pass");
      }
    });
  }

  async drop() {
    return new Promise((resolve, reject) => {
      if (process.env.MODE === "DEV") {
        this.OrderDetail.drop()
          .then(() => {
            resolve("Table orderdetails Dropped!");
          })
          .catch((e) => {
            reject(e);
          });
      } else {
        reject("You shall not pass");
      }
    });
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      this.OrderDetail.findAll({
        order: [["id", "DESC"]],
      })
        .then((res) => {
          if (res.length > 0) {
            resolve(res);
          } else {
            resolve(null);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      this.OrderDetail.findOne({
        where: {
          id: id,
        },
        raw: true,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getByIdOrder(id) {
    return new Promise((resolve, reject) => {
      this.OrderDetail.findAll({
        where: {
          id_order: id,
        },
        raw: true,
        include: [
          {
            model: tb_product.Product,
            as: "products",
          },
        ],
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async add(data) {
    return new Promise((resolve, reject) => {
      this.OrderDetail.create(data)
        .then(() => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      this.OrderDetail.destroy({
        where: {
          id: id,
        },
      })
        .then(() => {
          resolve("Data is deleted !");
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async update(data) {
    return new Promise((resolve, reject) => {
      this.OrderDetail.update(data, {
        where: { id: id },
      })
        .then((res) => {
          if (res == 0) {
            reject(res);
          } else {
            resolve(res);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
})();
