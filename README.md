# Bamazon

Create a MySQL Database called bamazon.
Then create a Table inside of that database called products.
The products table should have each of the following columns:



item_id (unique id for each product)
product_name (Name of product)
department_name
price (cost to customer)
stock_quantity (how much of the product is available in stores)



Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

![menu](.\images\Customer\Screenshot (1).png)

Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
The app should then prompt users with two messages.

![customer](.\images\Customer\Screenshot (2).png)

The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy.

![customer](images\Customer\Screenshot (3).png)

Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

![customer](images\Customer\Screenshot (4).png)

If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

![customer](images\Customer\Screenshot (5).png)

However, if your store does have enough of the product, you should fulfill the customer's order.

![customer](images\Customer\Screenshot (6).png)

This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.

![customer](images\Customer\Screenshot (7).png)

![customer](images\Customer\Screenshot (8).png)


Challenge #2: Manager View (Next Level)

![manager](images\Manager\Screenshot (9).png)

Create a new Node application called bamazonManager.js. Running this application will:

![manager](images\Manager\Screenshot (10).png)

List a set of menu options:
View Products for Sale
View Low Inventory
Add to Inventory
Add New Product
If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

![manager](images\Manager\Screenshot (11).png)

![mgr](images\Manager\Screenshot (12).png)
![mgr](images\Manager\Screenshot (13).png)
![mgr](images\Manager\Screenshot (14).png)

Challenge #3: Supervisor View (Final Level)

Create a new MySQL table called departments. Your table should include the following columns:

department_id
department_name
over_head_costs (A dummy number you set for each department)

Modify the products table so that there's a product_sales column, and modify your bamazonCustomer.js app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

Make sure your app still updates the inventory listed in the products column.

Create another Node app called bamazonSupervisor.js. Running this application will list a set of menu options:

View Product Sales by Department
Create New Department

When a supervisor selects View Product Sales by Department, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

![super](images\Super\Screenshot (20).png)

The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit should not be stored in any database. You should use a custom alias.
If you can't get the table to display properly after a few hours, then feel free to go back and just add total_profit to the departments table.

![super](images\Super\Screenshot (17).png)
![super](images\Super\Screenshot (18).png)
![super](images\Super\Screenshot (19).png)