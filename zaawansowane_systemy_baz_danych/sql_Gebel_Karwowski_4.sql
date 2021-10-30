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

--10