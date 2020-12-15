const db = require('../Configs/db');

module.exports = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT product.id, product.name, product.price, product.image, category.name AS category FROM public.product LEFT JOIN public.category ON category.id = product.id_category ORDER BY product.id ASC',
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
  getSearch: (name) => {
    return new Promise((resolve, reject) => {
      db.query(
        `
          SELECT product.id,
                  product.name, 
                  product.price, 
                  product.image, 
                  category.name AS category
          FROM public.product 
          LEFT JOIN public.category 
          ON category.id = product.id 
          WHERE product.name
            ILIKE '%${name}%'
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
        `SELECT product.id, product.name, product.price, product.image, category.name AS category FROM public.product LEFT JOIN public.category ON category.id = product.id_category ORDER BY ${order} ${sort}`,
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
        `SELECT product.id, product.name, product.price, product.image, category.name AS category FROM public.product LEFT JOIN public.category ON category.id = product.id_category WHERE product.id=${id}`,
      )
        .then((res) => {
          if (res.rows.length == 0) {
            resolve('tidak ada data di table product');
          } else {
            resolve(res.rows[0]);
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
        `INSERT INTO public.product(name, price, image, id_category) VALUES('${data.name}',${data.price}, '${data.image}', ${data.id_category})`,
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
          resolve({ message: 'data terhapus !', status: res });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  update: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE public.product SET 
            name='${data.name}', 
            price='${data.price}', 
            image='${data.image}', 
            id_category=${data.id_category}
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
