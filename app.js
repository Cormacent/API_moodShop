const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname + "/.env") });
const express = require("express");
const server = express();
const routes = require("./src/main");
const db = require("./src/Configs/db");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const redis = require("./src/Configs/redis");
const logger = require("./src/Configs/winston");

server.use(bodyparser.urlencoded({ extended: false }));
server.use(bodyparser.json());
server.use(morgan("short", { stream: logger.stream }));
server.use(cors());
server.use("/public", express.static("public"));
server.use("/api", routes);
server.get("/health",(req,res)=>{

  res.send("I am very healthy")
})

db.testConnection();

redis
  .redisCheck()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(8089, () => {
  console.log("service running on port 8089");
});
