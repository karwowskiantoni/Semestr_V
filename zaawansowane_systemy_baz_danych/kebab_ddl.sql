ALTER DATABASE kebab SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
Use master;
DROP DATABASE kebab;
create database "kebab";
use kebab;
create table "product"(
	"id" int IDENTITY(1, 1) PRIMARY KEY,
	"name" varchar(50),
	"price" float,
	"weight" float,
	"is_vegan" bit,
	"is_archive" bit
)
--update trigger change is_archive value to true and create new product_type with changed values
--trigger use function which check that product_type was used or not, if not it just change value

create table "employee"(
	"id" int IDENTITY(1, 1) PRIMARY KEY,
	"name" varchar(50),
	"salary" int,
	"is_busy" bit,
)

create table "order"(
	"id" int IDENTITY(1, 1) PRIMARY KEY,
	"acceptance_time" datetime,
	"realization_time" datetime,
	"location" varchar(50)
)

--product_type-order
create table "product_order"(
	"order_id" int REFERENCES "order"(id),
	"product_id" int REFERENCES "product"(id),
	"amount" int,
	PRIMARY KEY (order_id, product_id)
)

--order-employee
create table "employee_order"(
	"employee_id" int references "employee"(id) NOT NULL,
	"order_id" int references "order"(id) NOT NULL,
	PRIMARY KEY (employee_id, order_id)
)