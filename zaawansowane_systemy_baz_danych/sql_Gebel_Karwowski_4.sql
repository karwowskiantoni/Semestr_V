-- 1
print 'Czesc, to ja'
-- 2
declare @figure int
set @figure = 10
print 'ZMIENNA = ' + CAST(@figure as varchar)
-- 3
declare @figure int
set @figure = 10
if (@figure % 2 = 0)
	print 'Liczba parzysta';
else 
	print 'Liczba niepatrzysta';
-- 4
declare @i int
set @i = 1
while @i < 5
begin
	print 'zmienna ma wartosc ' + cast(@i as varchar)
	set @i = @i +1
end
-- 5
declare @i int
set @i = 3
while @i < 8
begin
	if @i = 3 print 'poczatek'
	if @i = 5 print 'srodek'
	if @i = 7 print 'koniec'
	print @i;
	set @i = @i + 1
end
-- 6
use test_cwiczenia
create table oddzialy (
nr_odd int,
nazwa_odd varchar(30)
)
declare @i int
set @i = 1
while @i < 5
begin
	if @i = 1 insert into oddzialy (nr_odd, nazwa_odd) values (@i, 'ksiegowosc')
	if @i = 2 insert into oddzialy (nr_odd, nazwa_odd) values (@i, 'zbyt')
	if @i = 3 insert into oddzialy (nr_odd, nazwa_odd) values (@i, 'place')
	if @i = 4 insert into oddzialy (nr_odd, nazwa_odd) values (@i, 'transport')
	set @i = @i + 1
end
--7
declare @id int, @nazwa_odd varchar(30)
set @id = 4
select @nazwa_odd = nazwa_odd from test_cwiczenia..oddzialy where nr_odd = @id
print 'Nazwa oddzialu to: ' + @nazwa_odd
--8
use test_cwiczenia
declare @nr int, @nazwa varchar(30)
DECLARE kursor_1 CURSOR FOR 
SELECT  nr_odd, nazwa_odd
FROM oddzialy   

OPEN kursor_1  
FETCH NEXT FROM kursor_1 INTO @nr, @nazwa  

WHILE @@FETCH_STATUS = 0  
BEGIN  
      print 'Nazwa oddzialu to ' + @nazwa + ' numer oddzialu to ' + cast(@nr as varchar) 
      FETCH NEXT FROM kursor_1 INTO @nr, @nazwa 
END 

CLOSE kursor_1  
DEALLOCATE kursor_1 
--9
use test_cwiczenia
declare @nr int, @removed_counter int
set @removed_counter = 0
DECLARE kursor_2 CURSOR FOR 
SELECT  nr_odd
FROM oddzialy   

OPEN kursor_2  
FETCH NEXT FROM kursor_2 INTO @nr  

WHILE @@FETCH_STATUS = 0  
BEGIN  
      if(@nr > 2) 
		begin
			delete from oddzialy where nr_odd = @nr
			set @removed_counter = @removed_counter + 1
		end
	  FETCH NEXT FROM kursor_2 INTO @nr
END 
print 'Liczba usunietych rekordow to ' + cast(@removed_counter as varchar)
CLOSE kursor_2  
DEALLOCATE kursor_2 

--10
use test_cwiczenia
declare @nr int, @nazwa varchar(30), @does_exist bit
set @nazwa = 'psychiatria_3'
set @does_exist = 0
DECLARE kursor_3 CURSOR FOR 
SELECT  nr_odd
FROM oddzialy   

OPEN kursor_3  
FETCH NEXT FROM kursor_3 INTO @nr

WHILE @@FETCH_STATUS = 0  
BEGIN  
		if(@nr = 3) 
		begin 
			set @does_exist = 1
			update oddzialy
			set nazwa_odd = @nazwa
			where nr_odd = @nr
		end
      FETCH NEXT FROM kursor_3 INTO @nr
END 

CLOSE kursor_3  
DEALLOCATE kursor_3 
if(@does_exist = 0) insert into oddzialy(nr_odd, nazwa_odd)
values (3, @nazwa)