const connection = require("./connection.js");

const orm = {
  viewTopScores(cb) {
    const queryString = "SELECT name, balance FROM players";
    console.log(queryString);
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      result.sort((a, b) => {
        return b.balance - a.balance;
      });
      cb(result);
    });
  },
  getScore(name, cb) {
    let queryString = "SELECT balance FROM players WHERE name = ";
    queryString += "'";
    queryString += name;
    queryString += "'";
    console.log(queryString);
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

module.exports = orm;
