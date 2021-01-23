const db = require('../Configs/db');
const Sequelize = require('sequelize');
const tb_order = require('./Order');
const tb_product = require('./Product');

module.exports = new (class OrderItem {
  constructor() {
    this.OrderItem = db.sequelize.define('orderitems', {
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
          model: 'products',
          key: 'id',
        },
      },
      id_order: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'orders',
          key: 'id',
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
    this.OrderItem.belongsTo(tb_product.Product, {
      foreignKey: 'id_product',
      as: 'products',
    });
    this.OrderItem.belongsTo(tb_order.Order, {
      foreignKey: 'id_order',
      as: 'orders',
    });
  }

  async commit() {
    return new Promise((resolve, reject) => {
      if (process.env.MODE === 'DEV') {
        this.OrderItem.sync()
          .then(() => {
            resolve('Table Order Item Created!');
          })
          .catch((e) => {
            console.log(e);
            reject(e);
          });
      } else {
        reject('You shall not pass');
      }
    });
  }

  async drop() {
    return new Promise((resolve, reject) => {
      if (process.env.MODE === 'DEV') {
        this.OrderItem.drop()
          .then(() => {
            resolve('Table orderitems Dropped!');
          })
          .catch((e) => {
            reject(e);
          });
      } else {
        reject('You shall not pass');
      }
    });
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      this.OrderItem.findAll({
        order: [['id', 'DESC']],
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
      this.OrderItem.findOne({
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
      this.OrderItem.findAll({
        where: {
          id_order: id,
        },
        raw: true,
        include: [
          {
            model: tb_product.Product,
            as: 'products',
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
      this.OrderItem.create(data)
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
      this.OrderItem.destroy({
        where: {
          id: id,
        },
      })
        .then((res) => {
          if (res == 0) {
            resolve('No data with id : ' + id);
          } else {
            resolve('Data is deleted !');
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  async update(data) {
    return new Promise((resolve, reject) => {
      this.OrderItem.update(data, {
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
