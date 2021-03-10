"use strict";
module.exports = (sequelize, DataTypes) => {
  const Casino = sequelize.define("players", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    balance: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });
  return Casino;
};
