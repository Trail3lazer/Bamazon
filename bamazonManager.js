var mysql = require("mysql");
var inquirer = require("inquirer");
var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
})


let checkpoint = (obj) => {
    console.log("pass")
    console.log(obj)
}

let viewProducts = {
    name: 'View Products for Sale',
    func: () => {
        con.query("SELECT * FROM products", (err, table) => {
            if (err) throw err;

            for (let i in table) {
                let details = ['\n--------------------'];
                for (let prop in table[i]) {
                    details.push(prop + ': ' + table[i][prop])
                };
                console.log(details.join("\n"))
            };
            con.end();
        })
    }
}

let lowInventory = {
    name: 'View Low Inventory',
    func: () => {
        con.query("SELECT * FROM products WHERE stock_quantity < 5", (err, table) => {
            if (err) throw err;

            for (let i in table) {
                let details = ['\n--------------------'];
                for (let prop in table[i]) {
                    details.push(prop + ': ' + table[i][prop])
                };
                console.log(details.join("\n"))
            };
            con.end();
        })
    }
}

let addInventory = {
    name: 'Add to Inventory',
    func: () => {
        let items = [];
        con.query("SELECT * FROM products", (err, table) => {
            if (err) throw err;
            for (let i in table) {
                items.push(table[i]["product_name"])
            };
            inquery();
        })

        let inquery = () => {
            inquirer.prompt([{
                type: "list",
                message: "What item do you want to change?",
                choices: items,
                name: "name"
            }, {
                type: "input",
                message: "How much would you like to add?",
                name: "number"
            }]).then((response, err) => {
                if (err) throw err;
                con.query(`UPDATE products SET stock_quantity = stock_quantity + ${response.number} WHERE product_name = "${response.name}";`, (err, table) => {
                    if (err) throw err;
                    console.log("Success")
                    con.end();
                    return;
                })
            })
        }
    }
}

let addNew = {
    name: 'Add New Product',
    func: () => {

        let inquery = () => {
            inquirer.prompt([{
                type: "input",
                message: "What's the name of the item you want to add?",
                name: "name"
            }, {
                type: "input",
                message: "What's the name of the department the item is a part of?",
                name: "dep"
            }, {
                type: "input",
                message: "How much do you want to charge for the item?",
                name: "price"
            }, {
                type: "input",
                message: "How much stock would you like to add?",
                name: "stock"
            }, {
                type: "confirm",
                message: "Is the above information correct?",
                name: "conf"
            }]).then((response, err) => {
                if (err) throw err;
                if (response.conf) {
                    con.query(`INSERT INTO products(item_id,  product_name, department_name, price, stock_quantity) \n 
                    VALUES (0, "${response.name}", "${response.dep}", ${response.price}, ${response.stock});`, (err, table) => {
                            if (err) throw err;
                            console.log("Success")
                            con.end();
                            return;
                        })
                }
            })
        };
        inquery();
    }
}

let deleteItem = {
    name: "Remove item from inventory",
    func: () => {
        let items = [];
        con.query("SELECT * FROM products", (err, table) => {
            if (err) throw err;
            for (let i in table) {
                items.push(table[i]["product_name"])
            };
            inquery();
        })


        let inquery = () => {
            inquirer.prompt([{
                type: "list",
                message: "What item do you want to remove?",
                choices: items,
                name: "name"
            }, {
                type: "confirm",
                message: "Is the above information correct?",
                name: "conf"
                }])
            .then((response, err) => {
                if (err) throw err;
                if(response.conf){
                con.query(`DELETE FROM products WHERE product_name = "${response.name}";`, (err, table) => {
                    if (err) throw err;
                    console.log("Success")
                    con.end();
                    return;
                })
            }})
        }
    }
}

let options = [viewProducts, lowInventory, addInventory, addNew, deleteItem]

const go = () => {
    let optionMessages = []
    for (let i in options) { optionMessages.push(options[i].name) }
    inquirer.prompt([{
        name: "option",
        message: "What would you like to do?",
        choices: optionMessages,
        type: "list"
    }]).then((ans, err) => {
        if (err) throw err;
        let actionObj;
        for (let i in options) {
            if (options[i].name === ans["option"]) {
                actionObj = options[i];
            }
        };
        actionObj.func();
        return;
    })

}
go()

