const db = require('../Configs/db');

module.exports = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT product.nama, jumlah, tanggal FROM public.history LEFT JOIN public.product ON id_product = product.id ORDER BY id ASC',
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
      db.query(`SELECT * FROM public.history WHERE id=${id}`)
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
      db.query(
        `INSERT INTO public.history(id_produk, jumlah, tanggal) VALUES('${data.id_produk}','${data.jumlah}','${data.tanggal}')`,
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
        `UPDATE public.history SET id_produk=${data.id_produk}, jumlah=${data.jumlah}, tanggal='${data.tanggal}' WHERE id=${data.id}`,
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
