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
    choices: ["View product sales by department", "Create New Department", "Remove Department"],
    name: "action"
}]).then((response) => {
    switch (response.action) {
        case "View product sales by department":
            con.query("SELECT * FROM departments", (err, table) => {
                if (err) throw err;
                let arr = [];
                let shortList = [];
                for (i in table) { arr.push(table[i]); shortList.push(table[i]["department_name"]) }
                inquirer.prompt([
                    {
                        type: "list",
                        message: "Which department would you like to view?",
                        choices: shortList,
                        name: "department_name"
                    }
                ]).then((ans) => {
                    let department = arr[shortList.indexOf(ans.department_name)]
                    console.log("$" + department["product_sales"])
                    return con.end();
                }).catch((err) => console.log(err));
            })
            break;

        case "Create New Department":

            let inquery = () => {
                inquirer.prompt([{
                    type: "input",
                    message: "What's the name of the department you want to add?",
                    name: "name"
                }, {
                    type: "input",
                    message: "How much does it cost to run this department?",
                    name: "over_head_costs"
                }, {
                    type: "input",
                    message: "How much is the initial sales total of this department?",
                    name: "product_sales"
                }, {
                    type: "confirm",
                    message: "Is the above information correct?",
                    name: "conf"
                }]).then((response, err) => {
                    if (err) throw err;
                    if (response.conf) {
                        con.query(`INSERT INTO departments(id, department_name, over_head_costs, product_sales) \n 
                        VALUES (0, "${response.name}", ${response.over_head_costs}, ${response.product_sales});`, (err, table) => {
                                if (err) throw err;
                                console.log("Success")
                                con.end();
                                return;
                            })
                    } else { return console.log("Goodbye"); }
                })
            };
            inquery();

            break;
        case "Remove Department":
            con.query("SELECT * FROM departments", (err, table) => {
                if (err) throw err;
                let arr = [];
                let shortList = [];
                for (i in table) { arr.push(table[i]); shortList.push(table[i]["department_name"]) }
                inquirer.prompt([
                    {
                        type: "list",
                        message: "Which department would you like to remove?",
                        choices: shortList,
                        name: "department_name"
                    }, {
                        type: "confirmation",
                        message: "Do you really want to pay the demolition crew to take out that part of your store, and then pay hourly for the clean up, all of which could amount to millions or even billions of dollars, depending on if Bamazon gets shut down for infringing on copyright laws?",
                        name: "conf"
                    }
                ]).then((ans) => {
                    if (ans.conf) {
                    let department = arr[shortList.indexOf(ans.department_name)]
                    con.query(`DELETE FROM departments WHERE department_name = "${ans.department_name}";`, (err, table) => {
                                if (err) throw err;
                                console.log("Success! Good luck paying all those bills.")
                                con.end();
                                return;
                            })}
                    else {return con.end();}
                }).catch((err) => console.log(err));
            })
            break;
    }
}, (err) => { console.log(err) })