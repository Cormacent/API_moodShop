const db = require("../Configs/db");
const Sequelize = require("sequelize");

module.exports = new (class Category {
  constructor() {
    this.Category = db.sequelize.define("categorys", {
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
    });
  }

  async commit() {
    return new Promise((resolve, reject) => {
      if (process.env.MODE === "DEV") {
        this.Category.sync()
          .then(() => {
            resolve("Table categorys Created!");
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
        this.Category.drop()
          .then(() => {
            resolve("Table categorys Dropped!");
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
      this.Category.findAll({
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
      this.Category.findOne({
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
      this.Category.create(data)
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
      this.Category.destroy({
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
      this.Category.update(data, {
        where: { id: data.id },
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

// module.exports = {
//   getAll: () => {
//     return new Promise((resolve, reject) => {
//       db.query('SELECT * FROM public.category ORDER BY id ASC')
//         .then((res) => {
//           if (res.rows.length == 0) {
//             resolve('No data in the category table');
//           } else {
//             resolve(res.rows);
//           }
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   },

//   getSearch: (name) => {
//     return new Promise((resolve, reject) => {
//       db.query(
//         `SELECT * FROM public.category WHERE name ILIKE '%${name}%'`,
//       )
//         .then((res) => {
//           if (res.rows.length == 0) {
//             resolve('No data in the category table');
//           } else {
//             resolve(res.rows);
//           }
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   },

//   get: (id) => {
//     return new Promise((resolve, reject) => {
//       db.query(`SELECT * FROM public.category WHERE id=${id}`)
//         .then((res) => {
//           if (res.rows.length == 0) {
//             resolve('No data in the category table');
//           } else {
//             resolve(res.rows[0]);
//           }
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   },

//   add: (data) => {
//     return new Promise((resolve, reject) => {
//       db.query(
//         `INSERT INTO public.category(name) VALUES('${data.name}')`,
//       )
//         .then((res) => {
//           resolve(data);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   },

//   delete: (id) => {
//     return new Promise((resolve, reject) => {
//       db.query(`DELETE FROM public.category WHERE id=${id}`)
//         .then((res) => {
//           resolve('Data is deleted !');
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   },

//   update: (data) => {
//     return new Promise((resolve, reject) => {
//       db.query(
//         `UPDATE public.category SET name='${data.name}' WHERE id=${data.id}`,
//       )
//         .then((res) => {
//           resolve(data);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   },
// };
