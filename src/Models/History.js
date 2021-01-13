const db = require("../Configs/db");
const Sequelize = require("sequelize");

module.exports = new (class History {
  constructor() {
    this.History = db.sequelize.define("historys", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      invoice: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cashier: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      name_product: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    });
  }

  async commit() {
    return new Promise((resolve, reject) => {
      if (process.env.MODE === "DEV") {
        this.History.sync()
          .then(() => {
            resolve("Table historys Created!");
          })
          .catch((e) => {
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
        this.History.drop()
          .then(() => {
            resolve("Table historys Dropped!");
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
      this.History.findAll({
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
      this.History.findOne({
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

  async add(data) {
    return new Promise((resolve, reject) => {
      this.History.create(data)
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
      this.History.destroy({
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
      this.History.update(data, {
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