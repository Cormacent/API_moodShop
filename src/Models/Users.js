const db = require("../Configs/db");
const Sequelize = require("sequelize");

// class Users {}
module.exports = new (class Users {
  constructor() {
    this.Users = db.sequelize.define("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    });
  }

  async commit() {
    return new Promise((resolve, reject) => {
      if (process.env.MODE === "DEV") {
        this.Users.sync()
          .then(() => {
            resolve("Table users Created!");
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
        this.Users.drop()
          .then(() => {
            resolve("Table users Dropped!");
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
      this.Users.findAll({
        raw: true,
        order: [["id", "DESC"]],
      })
        .then((res) => {
          if (res.length > 0) {
            resolve(res);
          } else {
            resolve("No data in the user table");
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async getByEmail(email) {
    return new Promise((resolve, reject) => {
      this.Users.findOne({
        where: { email: email },
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

  async add(data) {
    return new Promise((resolve, reject) => {
      this.Users.create(data)
        .then(() => {
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async update(data) {
    return new Promise((resolve, reject) => {
      this.Users.update(data, { where: { email: data.email } })
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

  async delete(email) {
    return new Promise((resolve, reject) => {
      this.Users.destroy({
        where: email,
      })
        .then((res) => {
          resolve({
            command: res.command,
            message: "Data is deleted !",
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
})();

// async add(data) {
//   return new Promise((resolve, reject) => {
//     db.query(
//       `INSERT INTO public.users(
//               role, name, "password", email)
//               VALUES ('${data.role}', '${data.name}', '${data.password}', '${data.email}')`
//     )
//       .then((res) => {
//         resolve(data);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

// async getbyEmail(email) {
//   return new Promise((resolve, reject) => {
//     db.query(`SELECT * FROM public.users WHERE email='${email}'`)
//       .then((res) => {
//         if (res.rows.length == 0) {
//           resolve("No data in the user table");
//         } else {
//           resolve(res.rows[0]);
//         }
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

// async getAll() {
//   return new Promise((resolve, reject) => {
//     db.query(`SELECT * FROM public.users ORDER BY id ASC`)
//       .then((res) => {
//         if (res.rows.length == 0) {
//           logger.warn({ message: "No data in the user table" });
//           resolve("No data in the user table");
//         } else {
//           resolve(res.rows);
//         }
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

// async get(id) {
//   return new Promise((resolve, reject) => {
//     db.query(`SELECT * FROM public.users WHERE id=${id}`)
//       .then((res) => {
//         if (res.rows.length == 0) {
//           resolve("No data in the user table");
//         } else {
//           resolve(res.rows[0]);
//         }
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

// async update(data) {
//   return new Promise((resolve, reject) => {
//     db.query(
//       `UPDATE public.users
//         SET name='${data.name}', password='${data.password}', email='${data.email}', role='${data.role}'
//         WHERE id=${data.id}`
//     )
//       .then((res) => {
//         resolve(data);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }
// async delete(id) {
//   return new Promise((resolve, reject) => {
//     db.query(`DELETE FROM public.users WHERE id=${id}`)
//       .then((res) => {
//         resolve({
//           command: res.command,
//           message: "Data is deleted !",
//         });
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }
