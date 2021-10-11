--1
/*
with ilosc_wynajmow as (
	select nieruchomoscnr, count(*) as wynajecia from wynajecia group by nieruchomoscnr
), ilosc_wizyt as
(
	select nieruchomoscnr, count(*) as wizyty from wizyty group by nieruchomoscnr
) select nieruchomosci.nieruchomoscnr, wynajecia, wizyty from nieruchomosci
join ilosc_wynajmow on ilosc_wynajmow.nieruchomoscNr = nieruchomosci.nieruchomoscnr
join ilosc_wizyt on ilosc_wizyt.nieruchomoscNr = nieruchomosci.nieruchomoscnr 

--2
with pierwotny_czynsz as (
select nieruchomoscNr, czynsz
from wynajecia as w1
where od_kiedy = (select min(od_kiedy) from wynajecia as w2 where w1.nieruchomoscNr = w2.nieruchomoscNr)
)
select nieruchomosci.nieruchomoscnr, ((nieruchomosci.czynsz - pierwotny_czynsz.czynsz*1.0) / pierwotny_czynsz.czynsz * 100) as procent_wzrostu 
from nieruchomosci 
join pierwotny_czynsz on nieruchomosci.nieruchomoscnr = pierwotny_czynsz.nieruchomoscNr

--3
with wynajem as (
select nieruchomoscnr, czynsz, MONTH(do_kiedy - od_kiedy) as dlugosc_wynajmu from wynajecia
)
select nieruchomoscnr, sum(czynsz * dlugosc_wynajmu) from wynajem group by nieruchomoscnr;
*/
--4

