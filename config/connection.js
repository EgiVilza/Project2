// Set up MySQL connection.
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "ny4u&PK*Tbv7",
  database: "casinoDB"
});

// Make connection.
connection.connect(err => {
  if (err) {
    console.error(`Error Connecting: ${err.stack}`);
    return;
  }
  console.log(`Connected as ID ${connection.threadId}`);
});

// Export connection for our ORM to use.
module.exports = connection;
