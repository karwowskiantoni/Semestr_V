use kebab;

--1
--Trigger which archives product and creates new on update
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
	print 'Zmiana cech produktu spowodowa³a jego archiwizacjê w bazie danych i utworzenie nowego o zmienionych parametrach'
END

--2
--Trigger which archives product on delete
go
CREATE OR ALTER TRIGGER archive_instead_of_delete ON product
INSTEAD OF DELETE
AS
BEGIN
	update product set is_archive = 1 
	where product.id in (select id from deleted)
	print 'Usunieciê produktu spowodowalo jego archiwizacjê w bazie danych'
END

--3
--Trigger which increases employee salary on every third order
go
CREATE OR ALTER TRIGGER bonus_on_third_order ON employee_order
for insert
AS
BEGIN
	declare @order_number int = (select count(*) from employee_order where employee_id in (select employee_id from inserted))
	if @order_number % 3 = 0 and @order_number != 0
	begin
		print 'UWAGA! Zamówienie jubileuszowe, pensja pracownika zostaje zwiêkszona o 5!'
		update employee set salary = salary + 5 
		where employee.id in (select employee_id from inserted)
	end
END
