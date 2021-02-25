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


    
function startApp() {
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
                    removeEmployee();
                    break;

                case "Update Role":
                    updateRole();
                    break;

                default:
                    connection.end()
                    break;
            }
        });
}        

// view by department
function viewByDepartment() {
   
 connection.query("SELECT * FROM department", function (err, result, fields) {
     if (err) throw err;
     console.log("DEPARTMENTS");
     console.table(result);
     connection.end();
     startApp();
    });
  

} 
// view all employees
function viewAllEmployees() {

        const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN employee manager on manager.id = employee.manager_id
        INNER JOIN role ON (role.id = employee.role_id)
        INNER JOIN department ON (department.id = role.department_id)
        ORDER BY employee.id;`;
        connection.query(query, function (err, result, fields) {
            if (err) throw err;
        console.log("VIEW ALL EMPLOYEES");
        console.table(result);
        startApp();
           });
         

}     

// view by role
function viewAllRoles() {
    
        connection.query("SELECT * FROM roles", function (err, result, fields) {
            if (err) throw err;
            console.log("ROLES");
            console.table(result);
            startApp();
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
    .then(function(result) {
        const department = result.department;
        const query = `INSERT INTO department (name) VALUES("${department}")`;
        connection.query(query, function(err, result) {

          if (err) throw err;
        console.log("Record added!", result);
        console.table(result);
        startApp();
   // var sql = "INSERT INTO department (id, name) VALUES ('', '');
   // connection.connect.query(sql, function (err, result) {
   //   if (err) throw err;
   //   console.log("1 record inserted");
   // });
  });
});
}

// add role
function addRole() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the job title?",
        name: "title"
      },
      {
        type: "input",
        message: "Please enter the salary applicable to the position?",
        name: "salary"
      },
      {
        type: "input",
        message: "Please enter the department ID?",
        name: "department_id"
    }]
    )
    .then(function(result) {
        const title = result.title;
        const salary = result.salary;
        const department_id = result.department_id;
        const query = `INSERT INTO roles (title, salary, department_id) VALUE("${title}", "${salary}", "${department_id}")`;
        connection.query(query, function(err, result) {
            if (err) throw err;
            console.table(result);
            startApp();
          });
        });

}

// add employee
function addEmployee() {
    inquirer
    .prompt([
        {
          type: "input",
          message: "Please enter the employees first name.",
          name: "first_name"
        },
        {
          type: "input",
          message: "Please enter the employees last name.",
          name: "last_name"
        },
        {
          type: "input",
          message: "Enter the employees role ID",
          name: "role_id"
        },
        {
          type: "input",
          message: "Enter the employees manager ID.",
          name: "manager_id"
        }
      ])
      .then(function(result) {
        const first_name = result.first_name;
        const last_name = result.last_name;
        const role_id = result.role_id;
        const manager_id = result.manager_id;
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE("${first_name}", "${last_name}", "${role_id}" , "${manager_id}")`;
        connection.query(query, function(err, result) {
            if (err) throw err;
            console.table(result);
            startApp();
          });
        });

}

// Update role

function promptID() {
    return ([
        {
            name: "name",
            type: "input",
            message: "Please enter the employee ID:  "
        }
    ]);
}


function updateRole() {
    connection.query(
        `SELECT CONCAT(e.first_name, ' ', e.last_name) AS employees, e.id, r.title
        FROM employee e 
        LEFT JOIN roles r 
        ON r.id = e.role_id`, (err, result) => {
        if (err) throw err;

        const rolesArray = result.map(roles =>({name : roles.title, value : roles.id}));
        const employeeArray = result.map(employee => ({name: employee.employees, value: employee.id}));
        inquirer.prompt([
            {
                name: "employee",
                type: "list",
                message: "Select employee who's role needs to be updated: ",
                choices: employeeArray
            },
            {
                name: "role",
                type: "list",
                message: "Select employee's updated role: ",
                choices: rolesArray.filter((item, index) => rolesArray.indexOf(item) === index),
            },
        ],
        ).then((answer) => {
            connection.query(
                `UPDATE employee 
                SET role_id =?
                WHERE id = ?`, 
                [answer.role, answer.employee],
                (err, res) => {
                    if (err) throw err;
                    console.log(`Update was Successful`);
                    console.table(result);
                    startApp();
                }
            )
        })
    })
}

// Delete an employee
 //connection.connect(function(err) {
  //  if (err) throw err;
  //  var sql = `DELETE FROM employee WHERE CONCAT(employee.first_name, ' ', employee.last_name) = ?`,
   // connection.query(sql, function (err, result) {
   //   if (err) throw err;
   //   console.log("Number of records deleted: " + result.affectedRows);
   // });
 // });

function removeEmployee() {
    connection.query(
        `SELECT CONCAT(e.first_name, ' ', e.last_name) AS employees, e.id, r.title
        FROM employee e 
        LEFT JOIN roles r 
        ON r.id = e.role_id`, (err, res) => {
        if (err) throw err;


        const employeeArray = res.map(employee => ({name: employee.employees, value: employee.id}));
            //const employeeArray = res.map(employee => ({name: employee.employees}));
            inquirer.prompt([
                {
                    name: "employee",
                    type: "list",
                    message: "Select employee you'd like to remove: ",
                    choices: employeeArray
                }
            ],
            ).then((answer) => {
                connection.query(
                    `DELETE FROM employee WHERE CONCAT(employee.first_name, ' ', employee.last_name) = ?`,
                    [answer.employee], (err,res) => {
                        if (err) throw err;
                        console.log(`Employee DELETED SUCCESSFULLY`);
                        console.table(result);
                        startApp();
                    }
                )
            })
        }
    )
}
connection.connect(function(err) {
    if(err) throw err;
    console.log('Connected Successfully');
    startApp();
});
