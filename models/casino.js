// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
const sequelize = require("../config/connection.js");

// Creates a model that matches up with DB
const Casino = sequelize.define("players", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  balance: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

// Syncs with DB
Casino.sync();

// Makes the  Model available for other files (will also create a table)
module.exports = Casino;
