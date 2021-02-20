const mysql = require("mysql");


const DB = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  NAME: "realstate",
};

var connection = mysql.createPool({
  host: DB.HOST,
  user: DB.USER,
  password: DB.PASSWORD,
  database: DB.NAME
});

module.exports = connection;
