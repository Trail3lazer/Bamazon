var inquirer = require("inquirer");
let functions = {
    customer: () => {
        require("./bamazonCustomer")
},
    manager: () => {
        require("./bamazonManager");
},
    supervisor: () => {
        require("./bamazonSupervisor")
    }
}
let arr = [];
for (keys in functions){arr.push(keys)}

inquirer.prompt([{
    type: "list",
    message: "Which app would you like to use?",
    choices: arr,
    name: "app"
}]).then((ans, err)=>{
    functions[`${ans.app}`]()

}).catch((err) =>{throw err})