-- 1. Create a MySQL Database called `bamazon`.
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

-- 2. Then create a Table inside of that database called `products`.
CREATE TABLE products (
-- 3. The products table should have each of the following columns:
item_id int NOT NULL AUTO_INCREMENT,
--    * item_id (unique id for each product)
product_name VARCHAR(100) NOT NULL,
--    * product_name (Name of product)
department_name VARCHAR(50),
--    * department_name
price FLOAT(15,2) NOT NULL,
--    * price (cost to customer)
stock_quantity INT NOT NULL,
--    * stock_quantity (how much of the product is available in stores)
PRIMARY KEY (item_id)
);
-- 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Boots", "Apparel", 20, 5), ("Sprite", "Food", 1, 51), ("Floss", "Health", 1, 67), ('Nose Hair Clippers', 'Health', 1, 500),("Your car's bumper", "Automotive", 120, 1),("Toe Nails", "Potion Supplies", 4, 65), ('Danger Noodle', "Pets", 26, 3), ('Flashlight', 'Tools', 5, 15), ('Cheeto', "Food", 1, 362), ("The Challenger Shuttle", "Space Exploration", 7, 1);

SELECT * FROM products;
