
// Running this application will first display all of the items available for sale. 
// Include the ids, names, and prices of products for sale.
var mysql = require("mysql");
var inquirer = require("inquirer");
var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
})

var exit = () => {
    setTimeout(() => {
        console.log("\n Why are you still here???  NOW, GET OFF MY SITE!!! \n");
        inquirer.prompt([{ type: "confirm", message: "Would you like to get off?", name: "tf" }])
            .then((val) => {
                if (val.tf === true) { con.end(); return; } else { shopping() }
            }).catch((err) => { console.log(err) })
    }, 1000);
}

var shopping = () => {
    con.query("SELECT * FROM products", (err, table) => {
        if (err) throw err;
        let arr = [];
        let shortList = [];
        for (i in table) { console.log(table[i]["item_id"], table[i]["product_name"]+": $"+table[i]["price"]), arr.push(table[i]); shortList.push(table[i]["product_name"]) }
        console.log("\n\n\n")
        // -- 6. The app should then prompt users with two messages.
        inquirer.prompt([
            // --    * The first asks them the product they would like to buy.
            {
                type: "list",
                message: "Which item would you like to buy?",
                choices: shortList,
                name: "product_name"
            }
        ]).then((ans) => {
            let item = arr[shortList.indexOf(ans.product_name)]
            inquirer.prompt([
                // --    * The second message asks how many units of the product they would like to buy.
                {
                    type: "number",
                    message: `How many units of ${item["product_name"]} would you like to buy? ${item["stock_quantity"]} available`,
                    name: "quantity"
                }
            ]).then((ans) => {
                // Once the customer has placed the order, the application checks if the has enough of the product to meet the customer's request.
                if (ans.quantity > item['stock_quantity']) {
                    console.log("Sorry we don't have that many.");
                    exit();
                } 
                else {
                    let message;
                    let price = ans.quantity * item['price'];
                    if(ans.quantity<0) {message = `Would you like to return ${-ans.quantity + " " + item["product_name"]} for $${-price*.5}`}
                    else {message = `Do you really want to pay $${price} for ${ans.quantity}?`}
                    //  Once the check goes through, it shows the customer the total cost of their purchase.
                    inquirer.prompt([{
                        type: "confirm",
                        message: message,
                        name: "tf"
                    }]).then((confirmation, err) => {
                        if (err) throw err;
                        //  However, if the store does have enough of the product, it fulfills the customer's order.
                        //  ~This means updating the SQL database to reflect the remaining quantity.
                        if (confirmation.tf === true) {
                            con.query(`
                                UPDATE products 
                                SET stock_quantity = stock_quantity - ${ans.quantity} 
                                WHERE item_id = ${item["item_id"]};`, (err, success) => {
                                    if (err) throw err;
                                    if (ans.quantity>1) {console.log(`Your ${ans.quantity} items are on their way!`) }
                                    else if(ans.quantity<=0) {"You're refund is on it's way."}
                                    else {console.log(`Your ${item["product_name"]} is on it's way!`) };
                                    con.query(`UPDATE departments
                                    SET product_sales = products_sales + ${price}
                                    WHERE department_name = "${item["department_name"]}";`, (err, success) => {
                                        if (err) throw err;
                                    })
                                    exit();
                                })
                        } else { exit() }
                    })
                }
            })
        })
    })
}

shopping()


// -- - - -

// -- * If this activity took you between 8-10 hours, then you've put enough time into this assignment. Feel free to stop here -- unless you want to take on the next challenge.

// -- - - -