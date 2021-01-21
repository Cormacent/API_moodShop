const db = require("../Configs/db");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const tb_category = require("./Category");

module.exports = new (class Product {
  constructor() {
    this.Product = db.sequelize.define("products", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      price: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      id_category: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "categorys",
          key: "id",
        },
      },
    });
    this.Product.belongsTo(tb_category.Category, {
      foreignKey: "id_category",
      as: "categorys",
    });
  }

  async commit() {
    return new Promise((resolve, reject) => {
      if (process.env.MODE === "DEV") {
        this.Product.sync()
          .then(() => {
            resolve("Table Products Created!");
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
        this.Product.drop()
          .then(() => {
            resolve("Table Products Dropped!");
          })
          .catch((e) => {
            reject(e);
          });
      } else {
        reject("You shall not pass");
      }
    });
  }

  async add(data) {
    return new Promise((resolve, reject) => {
      this.Product.create(data)
        .then(() => {
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      this.Product.findAll({
        raw: true,
        order: [["id", "DESC"]],
        include: [
          {
            model: tb_category.Category,
            as: "categorys",
          },
        ],
      })
        .then((res) => {
          if (res.length > 0) {
            resolve(res);
          } else {
            resolve(null);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      this.Product.findOne({
        where: {
          id: id,
        },
        raw: true,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async getSort(data) {
    return new Promise((resolve, reject) => {
      this.Product.findAll({
        // VALUE IN ORDER MUST ARRAY EX: [ 'column', 'orderby']
        order: [data],
        raw: true,
        include: [
          {
            model: tb_category.Category,
            as: "categorys",
          },
        ],
      })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async getSearch(data) {
    const searchKey = Object.keys(data).toString();
    const searchValue = Object.values(data).toString();
    return new Promise((resolve, reject) => {
      this.Product.findAll({
        where: {
          [searchKey]: {
            [Op.iLike]: `%${searchValue}%`,
          },
        },
        raw: true,
        order: [["id", "DESC"]],
        include: [
          {
            model: tb_category.Category,
            as: "categorys",
          },
        ],
      })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          if (e.parent.hint) {
            reject(e.parent.hint);
          } else {
            reject(e);
          }
        });
    });
  }

  async update(data) {
    return new Promise((resolve, reject) => {
      this.Product.update(data, { where: { id: data.id } })
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

  async delete(id) {
    return new Promise((resolve, reject) => {
      this.Product.destroy({
        where: { id: id },
      })
        .then((res) => {
          if (res == 0) {
            resolve('No data with id : ' + id);
          } else {
            resolve('Data is deleted !');
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
})();
