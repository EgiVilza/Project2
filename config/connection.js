const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "casinoDB"
});

connection.connect(err => {
  if (err) {
    console.error(`Error Connecting: ${err.stack}`);
    return;
  }
  console.log(`Connected as ID ${connection.threadId}`);
});

module.exports = connection;
