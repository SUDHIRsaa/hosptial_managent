const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("kifayti1", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

module.exports = sequelize;
