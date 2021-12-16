create table dziennik (
tabela VARCHAR(15),
"data" DATE,
l_wierszy INT,
komunikat VARCHAR(300)
)
--1
begin
	declare @licznik int, @premia int
	set @premia = 500
	update employees set salary = salary + @premia where  employee_id  in (select isnull(manager_id, 0) from employees)
	set @licznik = @@ROWCOUNT
	insert into dziennik (tabela, "data", l_wierszy, komunikat)
	values('employees', GETDATE(), @licznik, 'Wprowadzono dodatek funkcyjny w wysokosci ' + cast(@premia as varchar))
end
--2
begin
	declare @rok int, @licznik2 int, @komunikat varchar(50)
	set @rok = 1991
	set @licznik2 = (
	select count(*)
	from employees
	where YEAR(hire_date) = @rok)
	if @licznik2 = 0
		begin
			set @komunikat = 'Nikogo nie zatrudniono'
		end
	else
		begin
			set @komunikat = 'Zatrudniono ' + cast(@licznik2 as varchar) + ' pracowników'
		end
	insert into dziennik (tabela, "data", l_wierszy, komunikat)
	values('employees', GETDATE(), 0, @komunikat)
end
--3
begin
	declare @id_pracownika int, @dlugosc_stazu int, @komunikat2 varchar(50)
	set @id_pracownika = 100
	set @dlugosc_stazu = (select (DATEDIFF(YEAR, (select hire_date from employees where employee_id = @id_pracownika),GETDATE())))
	if @dlugosc_stazu > 15
		begin
			set @komunikat2 = cast(@id_pracownika as varchar) + ' chlop cale zycie w pracy'
		end
	else if @dlugosc_stazu = 15
		begin 
			set @komunikat2 = cast(@id_pracownika as varchar) + ' chlop pracuje 15 lat'
		end
	else
		begin
			set @komunikat2 = cast(@id_pracownika as varchar) + ' mamy takiego pracownika?'
		end
	insert into dziennik (tabela, "data", l_wierszy, komunikat)
	values('employees', GETDATE(), 0, @komunikat2)
end
--4
go
create procedure PIERWSZA
@param int
as
print 'Wartosc parametru wynosila ' + cast(@param as varchar)
go
exec PIERWSZA 5
drop procedure PIERWSZA
go
--5
go
drop procedure DRUGA
go
create procedure DRUGA(
@input_value varchar(50) = NULL, 
@output_value varchar(50) OUTPUT, 
@input_number int = 1)
as
begin 
	declare @second varchar(50) 
	set @second = 'DRUGA'
	print(@output_value)
	set @output_value = FORMATMESSAGE('%s %s %i', @second, @input_value, @input_number)
end
go
declare @xd varchar(50)
exec DRUGA
	@output_value = @xd OUTPUT,
	@input_value = 'Poziomka'
select @xd;
go

--6
go 
drop procedure awans
go
create procedure awans
@dep int = 90, @proc int = 50
as
begin
	declare @licznik int
	if @dep = 0
		begin
			update employees set salary = salary + ((@proc *0.01 )* salary)
		end
	else
		begin
			update employees set salary = salary + ((@proc *0.01 )* salary) where  department_id  = @dep
		end
	set @licznik = @@ROWCOUNT
insert into dziennik (tabela, "data", l_wierszy, komunikat)
values('employees', GETDATE(), @licznik, 'Wprowadzono podwyzke o ' + cast(@proc as varchar) + ' procent dla dzialu ' + @dep)
end
exec awans

--7
go
if exists(select 1 from sys.objects where name = 'proc_udzial') drop function proc_udzial
go
create function proc_udzial(@id_dzialu int)
RETURNS VARCHAR(10)
AS 
BEGIN
 return (select cast(sum(CASE WHEN department_id = @id_dzialu THEN salary ELSE 0 END)/sum(salary)*100 as varchar) + '%' from employees)
END
go
select department_id, dbo.proc_udzial(department_id) from departments;

--8

drop trigger do_archiwum
go
Create trigger do_archiwum 
on employees
FOR DELETE
AS
BEGIN
	select * into prac_archiw from deleted;
	declare deleted_items cursor for (select employee_id from deleted)
	declare @deleted_id varchar(10)
	while @@FETCH_STATUS = 0
		BEGIN
			fetch next from deleted_item into @deleted_id
			insert into dziennik(
				tabela, 
				data, 
				l_wierszy, 
				komunikat) 
			values(
				'employees',
				GETDATE(),
				1,
				FORMATMESSAGE('zwolniono pracownika numer: %s', @deleted_id)
			)
		END
	close deleted_items
	deallocate deleted_items
END

delete from employees where employee_id = 100;