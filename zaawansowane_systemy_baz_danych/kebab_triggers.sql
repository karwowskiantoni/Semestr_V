--1
--archive product_types on update or delete??? and create new???
go
create trigger archive on product 
for update 
as
begin
	
end

--2
--on order update or insert change is_busy status of employees assigned employees


--3
--on 100 realization created by employee increase salary by 100

