ALTER DATABASE kebab SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
Use master;
DROP DATABASE kebab;
create database "kebab";
use kebab;

--Entity of product which has it's business attributes along with is_archive which is vital for resolving problem of storing historical data without violating db rules
create table "product"(
	"id" int IDENTITY(1, 1) PRIMARY KEY,
	"name" varchar(50),
	"price" float,
	"weight" float,
	"is_vegan" bit,
	"is_archive" bit
)

--Entity of employee deliberately denormalized by is_busy attribute for simplicity reasons and also it saves a great amount of time. 
--That attribute is used in many cases and the only way to check it, is to go through all orders (and number of records are going to get bigger and bigger)
--and search if any realization time assigned to employee is null
create table "employee"(
	"id" int IDENTITY(1, 1) PRIMARY KEY,
	"name" varchar(50),
	"salary" int,
	"is_busy" bit,
)

--Entity of order which tells us when and where was it accepted and realized
create table "order"(
	"id" int IDENTITY(1, 1) PRIMARY KEY,
	"acceptance_time" datetime,
	"realization_time" datetime,
	"location" varchar(50)
)
--Associative enitity of product and order which also stores amount of ordered product
create table "product_order"(
	"order_id" int REFERENCES "order"(id),
	"product_id" int REFERENCES "product"(id),
	"amount" int,
	PRIMARY KEY (order_id, product_id)
)
--Associative entity of employee and order
create table "employee_order"(
	"employee_id" int references "employee"(id) NOT NULL,
	"order_id" int references "order"(id) NOT NULL,
	PRIMARY KEY (employee_id, order_id)
)