var mysql = require("mysql");
var inquirer = require("inquirer");
var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

inquirer.prompt([{
    type: "list",
    message: "Which action would you like to take?",
    choices: ["View product sales by department", "Create New Department"]
}])