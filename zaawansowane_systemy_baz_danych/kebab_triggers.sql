--1
--archive product and create new on update
use kebab;
go
CREATE OR ALTER TRIGGER archive_and_create_instead_of_update ON product
INSTEAD OF UPDATE
AS
BEGIN
	declare @to_update table (
	"id" int,
	"name" varchar(50),
	"price" float,
	"weight" float,
	"is_vegan" bit,
	"is_archive" bit
)

	insert into @to_update select * from deleted where is_archive = 0
	
	insert into product
	select name, price, weight, is_vegan, 0 from inserted where inserted.id in (select id from @to_update)
	
	update product set is_archive = 1 
	where product.id in (select id from @to_update)

END


--2
--archive product on delete
go
CREATE OR ALTER TRIGGER archive_instead_of_delete ON product
INSTEAD OF DELETE
AS
BEGIN
	update product set is_archive = 1 
	where product.id in (select id from deleted)
END

--3
--increase employee salary on every third order
go
CREATE OR ALTER TRIGGER bonus_on_third_order ON employee_order
for insert
AS
BEGIN
	declare @order_number int = (select count(*) from employee_order where employee_id in (select employee_id from inserted))
	if @order_number % 3 = 0 and @order_number != 0
	begin
		print 'zamówienie jubileuszowe, pensja pracownika zostaje zwiêkszona o 5'
		update employee set salary = salary + 5 
		where employee.id in (select employee_id from inserted)
	end
END
