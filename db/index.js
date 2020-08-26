var inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./connection.js");
var mysql = require("mysql");

runSearch();
function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Employees",
        "View All Roles",
        "Add Employee Department",
        "Add Employee",
        "Add Employee Role",
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
          addRole();
          break;

        case "Add Employee Department":
          addDept();
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
      console.table(res[i].name);
    }
    runSearch();
  });
}

function viewEmployees() {
  var query = "SELECT first_name, last_name FROM employees.employee";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.table(`${res[i].first_name} ${res[i].last_name}`);
    }
    runSearch();
  });
}

function viewRoles() {
  var query = "SELECT title FROM employees.role";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.table(res[i].title);
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
            message: "What is the employee's first name?",
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?" 
        },
        {
            name: "roleID",
            type: "input",
            message: "What is the employee's role ID?" 
        },
        {
            name: "manID",
            type: "input",
            message: "What is your manager ID?"
        }
    ]).then(function(answer) {
      var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
      connection.query(query, [answer.firstName, answer.lastName, answer.roleID, answer.manID], function(err, res) {
        if (err) throw (err);
        for (var i = 0; i < res.length; i++) {
          console.log(`New Employee: ${res[i].firstName} ${res[i].lastName} ${res[i].roleID} ${res[i].manID}`);
        }
        runSearch();
      });
    });
}

function addRole() {
    inquirer
    .prompt([
        {
            name: "title",
            type: "input",
            message: "What is the title of the new role?",
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary?" 
        },
        {
            name: "departmentID",
            type: "input",
            message: "What is the Department ID for this new role? Please select 1 for sales, 2 for engineering, 3 for accounting, 4 for law.",
            choices: [1, 2, 3, 4] 
        },
    ]).then(function(answer) {
      var query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
      connection.query(query, [answer.title, answer.salary, answer.departmentID], function(err, res) {
        if (err) throw (err);
        for (var i = 0; i < res.length; i++) {
          console.table(`New Role: ${res[i].title} ${res[i].salary} ${res[i].departmentID}`);
        }
        runSearch();
      });
    });
}

function addDept() {
    inquirer
    .prompt([
        {
            name: "department",
            type: "input",
            message: "What is the name of the new department?",
        },
    ]).then(function(answer) {
      var query = "INSERT INTO department (name) VALUES (?)";
      connection.query(query, [answer.deparment], function(err, res) {
        if (err) throw (err);
        for (var i = 0; i < res.length; i++) {
          console.table(`New Department: ${res[i].department}`);
        }
        runSearch();
      });
    });
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
