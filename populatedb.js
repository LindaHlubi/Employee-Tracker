  //Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');


// Server & port connection
var con = mysql.createConnection({
     
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Spunky1989",
    database: "employee_db"
  });
  
  //insert multiple records into a table department table
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
   var sql = "INSERT INTO employee (id, name) VALUES ?";
     var values = [
       ['1', 'Administraion'],
       ['2', 'Marketing / Sales'],
       ['3', 'IT'],
       ['4', 'Human Resources'],
       ['5', 'Management'],
      
     ];
     con.query(sql, [values], function (err, result) {
       if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
     });
  });