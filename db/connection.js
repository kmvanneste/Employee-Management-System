//connect mySQL database
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.MYSQL_KEY,
  database: "employees"
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;