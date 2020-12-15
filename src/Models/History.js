const db = require('../Configs/db');

module.exports = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM public.history ORDER BY history.id ASC')
        .then((res) => {
          if (res.rows.length == 0) {
            resolve('tidak ada data di table history');
          } else {
            resolve(res.rows);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getSearch: (invoice) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
          SELECT *
          FROM public.history 
          WHERE history.invoice
            ILIKE '%${invoice}%'
        `,
      )
        .then((res) => {
          if (res.rows.length == 0) {
            resolve('tidak ada invoice di table history');
          } else {
            resolve(res.rows);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getSort: (order, sort) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM public.history ORDER BY ${order} ${sort}`,
      )
        .then((res) => {
          if (res.rows.length == 0) {
            resolve('tidak ada data di table history');
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
      db.query(`SELECT * FROM public.history WHERE history.id=${id}`)
        .then((res) => {
          if (res.rows.length == 0) {
            resolve('tidak ada data di table history');
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
      let date = new Date().toISOString().split('T')[0];
      db.query(
        `INSERT INTO public.history(amount, invoice, date, cashier, name_product) VALUES('${data.amount}','${data.invoice}', '${date}', '${data.cashier}', '${data.name_product}')`,
      )
        .then((res) => {
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM public.history WHERE id=${id}`)
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
        `UPDATE public.history SET 
          amount='${data.amount}', 
          cashier='${data.cashier}', 
          name_product='${data.name_product}', 
          invoice=${data.invoice}
        WHERE id=${data.id}`,
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
