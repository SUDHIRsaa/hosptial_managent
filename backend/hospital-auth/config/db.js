const mysql = require("mysql2/promise");

const mySqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Ayush@12",
  database: "kifayati_db",
});
module.exports = mySqlPool;
