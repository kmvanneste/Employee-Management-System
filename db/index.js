var inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./connection.js");

//class DB
//constructor to connection
//find all managers
//select statements
runSearch();
//write all queries to database
function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add Employee Department",
        "Add Employee",
        "Add Employee Role",
        "View All Departments",
        "View All Employees",
        "View All Roles",
        "Update Employee Role",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Departments":
          viewDepts();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "View All Employees":
          viewEmployees();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Employee Role":
          addEmployeeRole();
          break;

        case "Add Employee Department":
          addEmployeeDept();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;
      }
    });
}

function viewDepts() {
  var query = "SELECT name FROM employees.department";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].name);
    }
    runSearch();
  });
}

function viewEmployees() {
  var query = "SELECT first_name, last_name FROM employees.employee";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(`${res[i].first_name} ${res[i].last_name}`);
    }
    runSearch();
  });
}

function viewRoles() {
  var query = "SELECT title FROM employees.role";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].title);
    }
    runSearch();
  });
}

function addEmployee() {
  inquirer
    .prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the employees first name?",
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the employees last name?" 
        }
    ]).then(function(answer) {
      var query = "INSERT INTO employee (first_name, last_name) VALUES ?";
      connection.query(query, { firstName: answer.firstName }, { lastName: answer.lastName }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(`New Employee: ${res[i].firstName} ${res[i].lastName}`);
        }
        runSearch();
      });
    });
}

function addEmployeeRole() {
  // var query = "SELECT first_name, last_name FROM employees.employee";
  //     connection.query(query, function(err, res) {
  //         for (var i = 0; i < res.length; i++) {
  //             console.log(`${res[i].first_name} ${res[i].last_name}`);
  //         }
  //         runSearch();
  //     });
}

function addEmployeeDept() {
  //     var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
  //     connection.query(query, function(err, res) {
  //       for (var i = 0; i < res.length; i++) {
  //         console.log(res[i].artist);
  //       }
  //       runSearch();
  //     });
  //   }
  //   function addEmployeeRole() {
  //     inquirer
  //       .prompt([
  //         {
  //           name: "start",
  //           type: "input",
  //           message: "Enter starting position: ",
  //           validate: function(value) {
  //             if (isNaN(value) === false) {
  //               return true;
  //             }
  //             return false;
  //           }
  //         },
  //         {
  //           name: "end",
  //           type: "input",
  //           message: "Enter ending position: ",
  //           validate: function(value) {
  //             if (isNaN(value) === false) {
  //               return true;
  //             }
  //             return false;
  //           }
  //         }
  //       ])
  //       .then(function(answer) {
  //         var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
  //         connection.query(query, [answer.start, answer.end], function(err, res) {
  //           for (var i = 0; i < res.length; i++) {
  //             console.log(
  //               "Position: " +
  //                 res[i].position +
  //                 " || Song: " +
  //                 res[i].song +
  //                 " || Artist: " +
  //                 res[i].artist +
  //                 " || Year: " +
  //                 res[i].year
  //             );
  //           }
  //           runSearch();
  //         });
  //       });
}

function updateEmployeeRole() {
  // var query = "SELECT first_name, last_name FROM employees.employee";
  //     connection.query(query, function(err, res) {
  //         for (var i = 0; i < res.length; i++) {
  //             console.log(`${res[i].first_name} ${res[i].last_name}`);
  //         }
  //         runSearch();
  //     });
}
