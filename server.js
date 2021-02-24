//Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');


// Server & port connection
var connection = mysql.createConnection({
     
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Spunky1989",
    database: "employee_db"
  });



 inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
               "View By Department",
                "View All Employees",
                "View All Roles",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Delete Employee",
                "Update Role",
                "Exit Application"
            ]
        })
        .then(answer => {
            console.log('answer', answer);
            
            switch (answer.action) {
                case "View By Department":
                    viewByDepartment();
                    break;

                case "View All Employees":
                    viewAllEmployees();
                    break;

                case "View All Roles":
                    viewAllRoles();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Remove Employee":
                    removeEmployee('delete');
                    break;

                case "Update Role":
                    updateRole('role');
                    break;

                default:
                    connection.end()
                    break;
            }
        });

// view by department
function viewByDepartment() {
    connection.connect(function(err) {
 if (err) throw err;
 connection.query("SELECT * FROM department", function (err, result, fields) {
     if (err) throw err;
     console.log(result);
    });
  });

} 
// view all employees
function viewAllEmployees() {
    connection.connect(function(err) {
        if (err) throw err;
        connection.query("SELECT * FROM employee", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
           });
         });

}     

// view by role
function viewAllRoles() {
    connection.connect(function(err) {
    if (err) throw err;
        connection.query("SELECT * FROM roles", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
           });
         });

}

// add department
function addDepartment() {
    inquirer
    .prompt({
      type: "input",
      message: "Please enter the name of the department you would like to add?",
      name: "department"
    })
    .then(function(res) {
        const department = res.department;
        const query = `INSERT INTO department (name) VALUES("${department}")`;
        connection.query(query, function(err, res) {

          if (err) throw err;
        console.log("Record added!", res);
   // var sql = "INSERT INTO department (id, name) VALUES ('', '');
   // connection.connect.query(sql, function (err, result) {
   //   if (err) throw err;
   //   console.log("1 record inserted");
   // });
  });
});
}



