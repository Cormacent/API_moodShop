const db = require("../Configs/db");
const Sequelize = require("sequelize");
const tb_users = require('./Users');
const { fields } = require("../Middleware/Multer");

module.exports = new (class Order {
  constructor() {
    this.Order = db.sequelize.define("orders", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
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
      invoice: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      payment: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(10),
        // type: Sequelize.ENUM("unpaid", "prosess", "ready", "done"),
        allowNull: false,
      },
    });
    this.Order.belongsTo(tb_users.Users, {
      foreignKey: "id_user",
      as: "users",
    });
  }

  async commit() {
    return new Promise((resolve, reject) => {
      if (process.env.MODE === "DEV") {
        this.Order.sync()
          .then(() => {
            resolve("Table Orders Created!");
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
        this.Order.drop()
          .then(() => {
            resolve("Table orders Dropped!");
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
      this.Order.findAll({
        order: [["id", "DESC"]],
        include:[
          {
            model:tb_users.Users,
            as:"users",
          }
        ]
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

  async getByIdUser(id) {
    return new Promise((resolve, reject) => {
      this.Order.findAll({
        where: {
          id_user: id,
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


  async getById(id) {
    return new Promise((resolve, reject) => {
      this.Order.findOne({
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
      this.Order.create(data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      this.Order.destroy({
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
      this.Order.update(data, {
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
