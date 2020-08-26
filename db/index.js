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
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
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

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          addDept();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;
      }
    });
}

function viewDepts() {
  var query = "SELECT name, id FROM employees.department ORDER BY id asc";
  connection.query(query, function (err, res) {
    console.table(res);
    runSearch();
  });
}

function viewEmployees() {
  var query = "SELECT employee.first_name, employee.last_name, role.title FROM employee, role WHERE employee.id = role.id;";
  connection.query(query, function (err, res) {
      console.table(res);
      runSearch();
  });
}

function viewRoles() {
  var query = "SELECT role.title, role.salary, department.name FROM role, department WHERE department.id = role.department_id;";
  connection.query(query, function (err, res) {
    console.table(res);
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
            name: "departmentName",
            type: "input",
            message: "What is the name of the department you would like to add?",
        },
    ]).then(function(answer) {
      var query = "INSERT INTO department (name) VALUE ('?')" ;
      connection.query(query, [answer.deparmentName], function(err, res) {
        if (err) throw (err);
        for (var i = 0; i < res.length; i++) {
          console.table(`New Department: ${res[i].department}`);
        }
        runSearch();
      });
    });
}

function updateEmployeeRole() {
   //ask the user what employee they want to update

   //pull that employees data

   //update that employees role
    inquirer
    .prompt([
        {
            name: "",
            type: "input",
            message: "What is the name of the department you would like to add?",
        },
    ]).then(function(answer) {
  // var query = "SELECT first_name, last_name FROM employees.employee";
  //     connection.query(query, function(err, res) {
  //         for (var i = 0; i < res.length; i++) {
  //             console.log(`${res[i].first_name} ${res[i].last_name}`);
  //         }
  //         runSearch();
  //     });
})
}
