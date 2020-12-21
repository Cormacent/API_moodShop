const db = require("../Configs/db");
const logger = require("../Configs/winston");
class Users {
  async add(data) {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO public.users(
                role, name, "password", email)
                VALUES ('${data.role}', '${data.name}', '${data.password}', '${data.email}')`
      )
        .then((res) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getbyEmail(email) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM public.users WHERE email='${email}'`)
        .then((res) => {
          if (res.rows.length == 0) {
            resolve("No data in the user table");
          } else {
            resolve(res.rows[0]);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM public.users ORDER BY id ASC`)
        .then((res) => {
          if (res.rows.length == 0) {
            logger.warn({ message: "No data in the user table" });
            resolve("No data in the user table");
          } else {
            resolve(res.rows);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async get(id) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM public.users WHERE id=${id}`)
        .then((res) => {
          if (res.rows.length == 0) {
            resolve("No data in the user table");
          } else {
            resolve(res.rows[0]);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async update(data) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE public.users
          SET name='${data.name}', password='${data.password}', email='${data.email}', role='${data.role}'
          WHERE id=${data.id}`
      )
        .then((res) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  async delete(id) {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM public.users WHERE id=${id}`)
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
}
module.exports = new Users();
