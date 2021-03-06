// Dependencies
const Sequelize = require("sequelize");

let sequelize;

// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
if (process.env.JAWDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize("casinoDB", "root", "ConnectMe", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    define: {
      timestamps: false
    }
  });
}


//Grant's ny4u&PK*Tbv7
// Exports the connection for other files to use
module.exports = sequelize;
