const db = require('../Configs/db');

module.exports = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT product.id, product.nama, product.harga, product.gambar, kategori.nama AS kategori, product.tanggal FROM public.product LEFT JOIN public.kategori ON kategori.id = product.id_kategori ORDER BY product.id ASC',
      )
        .then((res) => {
          if (res.rows.length == 0) {
            resolve('tidak ada data di table product');
          } else {
            resolve(res.rows);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getSearch: (nama) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
          SELECT product.id,
                  product.nama, 
                  product.harga, 
                  product.gambar, 
                  kategori.nama AS kategori,
                  product.tanggal
          FROM public.product 
          LEFT JOIN public.kategori 
          ON kategori.id = product.id 
          WHERE product.nama
            LIKE '%${nama}%'
        `,
      )
        .then((res) => {
          if (res.rows.length == 0) {
            resolve('tidak ada data di table product');
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
        `SELECT product.id, product.nama, product.harga, product.gambar, kategori.nama AS kategori, product.tanggal FROM public.product LEFT JOIN public.kategori ON kategori.id = product.id_kategori ORDER BY ${order} ${sort}`,
      )
        .then((res) => {
          if (res.rows.length == 0) {
            resolve('tidak ada data di table product');
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
      db.query(
        `SELECT product.id, product.nama, product.harga, product.gambar, kategori.nama AS kategori, product.tanggal FROM public.product LEFT JOIN public.kategori ON kategori.id = product.id_kategori WHERE product.id=${id}`,
      )
        .then((res) => {
          if (res.rows.length == 0) {
            resolve('tidak ada data di table product');
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
      // JavaScript Date.now() returns the number of milliseconds since the Unix Epoch (1 Jan 1970). PostgreSQL to_timestamp(…) converts a single argument, interpreted as the number of seconds since the Unix Epoch into a PosgtreSQL timestamp. At some point, the JavaScript value needs to be divided by 1000.
      db.query(
        `INSERT INTO public.product(nama, harga, gambar, id_kategori, tanggal) VALUES('${
          data.nama
        }',${data.harga}, '${data.gambar}', ${
          data.id_kategori
        }, to_timestamp(${Date.now()} / 1000.0))`,
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
      db.query(`DELETE FROM public.product WHERE id=${id}`)
        .then((res) => {
          resolve('data terhapus !');
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  update: (data, id) => {
    return new Promise((resolve, reject) => {
      // db.query(
      //   `UPDATE public.product SET nama='${data.nama}', harga=${data.harga}, gambar='${data.gambar}', id_kategori=${data.id_kategori} WHERE id=${data.id}`,
      // )
      db.query(`UPDATE public.product SET ? WHERE ${id};`, data)
        .then((res) => {
          console.log(res);
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
};
