const { Sequelize } = require("sequelize");

module.exports = new (class Connect {
  constructor() {
    this.sequelize = new Sequelize(
      process.env.DB_DATABASE,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        dialect: "postgres",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
      }
    );
  }
  testConnection() {
    this.sequelize
      .authenticate()
      .then(() => {
        console.log("Database connected");
      })
      .catch((e) => {
        console.log(e); 
      });
  }
})();