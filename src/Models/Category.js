const db = require('../Configs/db');

module.exports = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM public.category ORDER BY id ASC')
        .then((res) => {
          if (res.rows.length == 0) {
            resolve('tidak ada data di table category');
          } else {
            resolve(res.rows);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getSearch: (name) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM public.category WHERE name LIKE '%${name}%'`,
      )
        .then((res) => {
          if (res.rows.length == 0) {
            resolve('tidak ada data di table category');
          } else {
            resolve(res.rows);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  get: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM public.category WHERE id=${id}`)
        .then((res) => {
          if (res.rows.length == 0) {
            resolve('tidak ada data di table category');
          } else {
            resolve(res.rows);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  add: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO public.category(name) VALUES('${data.name}')`,
      )
        .then((res) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM public.category WHERE id=${id}`)
        .then((res) => {
          resolve('data terhapus !');
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  update: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE public.category SET name='${data.name}' WHERE id=${data.id}`,
      )
        .then((res) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
