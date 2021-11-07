USE biuro;
--1
WITH ilosc_wynajmow
     AS (SELECT nieruchomoscnr,
                Count(*) AS wynajecia
         FROM   wynajecia
         GROUP  BY nieruchomoscnr),
     ilosc_wizyt
     AS (SELECT nieruchomoscnr,
                Count(*) AS wizyty
         FROM   wizyty
         GROUP  BY nieruchomoscnr)
SELECT nieruchomosci.nieruchomoscnr,
       wynajecia,
       wizyty
FROM   nieruchomosci
       JOIN ilosc_wynajmow
         ON ilosc_wynajmow.nieruchomoscnr = nieruchomosci.nieruchomoscnr
       JOIN ilosc_wizyt
         ON ilosc_wizyt.nieruchomoscnr = nieruchomosci.nieruchomoscnr; 
--TOP
select nieruchomosci.nieruchomoscnr, count(distinct umowanr), count(distinct wizyty.klientnr)
from nieruchomosci
join wynajecia
on wynajecia.nieruchomoscNr = nieruchomosci.nieruchomoscnr
join wizyty
on wizyty.nieruchomoscnr = nieruchomosci.nieruchomoscnr
group by nieruchomosci.nieruchomoscnr;
--2
with pierwotny_czynsz as (
select nieruchomoscNr, czynsz
from wynajecia as w1
where od_kiedy = (select min(od_kiedy) from wynajecia as w2 where w1.nieruchomoscNr = w2.nieruchomoscNr)
)
select nieruchomosci.nieruchomoscnr, ((nieruchomosci.czynsz - pierwotny_czynsz.czynsz*1.0) / pierwotny_czynsz.czynsz * 100) as procent_wzrostu 
from nieruchomosci 
join pierwotny_czynsz on nieruchomosci.nieruchomoscnr = pierwotny_czynsz.nieruchomoscNr;

--3
select nieruchomoscnr, sum(czynsz * DATEDIFF(MONTH, od_kiedy, do_kiedy)) as laczna_wartosc_czynszu 
from wynajecia 
group by nieruchomoscnr;
--4
with zarobki as (select nieruchomoscnr, sum(czynsz * DATEDIFF(MONTH, od_kiedy, do_kiedy)) as laczna_wartosc_czynszu 
from wynajecia 
group by nieruchomoscnr)
select biuronr, sum(laczna_wartosc_czynszu) * 0.3 as zarobki_biura
from nieruchomosci
join zarobki on nieruchomosci.nieruchomoscnr= zarobki.nieruchomoscNr
group by biuroNr;
--5 a)
with max_wynajmow as (
select biura.miasto, count(umowanr) as ilosc_wynajmow
from biura
join nieruchomosci
on nieruchomosci.biuroNr = biura.biuroNr
join wynajecia
on wynajecia.nieruchomoscNr = nieruchomosci.nieruchomoscnr
group by biura.miasto
)
select *
from max_wynajmow
where ilosc_wynajmow = (select MAX(ilosc_wynajmow) from max_wynajmow)


--5 b)
with zarobki_per_nieruchomosc as (select nieruchomoscnr, sum(czynsz * DATEDIFF(MONTH, od_kiedy, do_kiedy)) as laczna_wartosc_czynszu 
from wynajecia 
group by nieruchomoscnr), zarobki_per_miasto as (
select nieruchomosci.miasto, sum(laczna_wartosc_czynszu) as zarobki_w_miescie
from nieruchomosci
join zarobki_per_nieruchomosc on nieruchomosci.nieruchomoscnr= zarobki_per_nieruchomosc.nieruchomoscNr
group by nieruchomosci.miasto)
select * from zarobki_per_miasto where zarobki_w_miescie = (select MAX(zarobki_w_miescie) from zarobki_per_miasto)
--6
select distinct wizyty.klientnr, wizyty.nieruchomoscnr 
from wizyty
join wynajecia
on wynajecia.klientnr = wizyty.klientnr 
AND wynajecia.nieruchomoscNr = wizyty.nieruchomoscnr 
AND wizyty.data_wizyty < wynajecia.od_kiedy;
--7
with pierwsze_wynajmy as (select klientnr, nieruchomoscNr, min(od_kiedy) as pierwszy_wynajem 
from wynajecia
group by klientnr, nieruchomoscNr)
select pierwsze_wynajmy.klientnr, count(wizyty.nieruchomoscnr)
from pierwsze_wynajmy
join wizyty
on pierwsze_wynajmy.klientnr = wizyty.klientnr AND pierwszy_wynajem > data_wizyty AND pierwsze_wynajmy.nieruchomoscNr != wizyty.nieruchomoscnr
group by pierwsze_wynajmy.klientnr;
--8
select distinct imie, nazwisko
from wynajecia
join klienci
on wynajecia.klientnr = klienci.klientnr
where max_czynsz < czynsz;
--9
select biuroNr
from biura
where biuroNr not in (select biuroNr from nieruchomosci);
--10 a)
select liczba_kobiet = (select count(*)  
from personel
where plec = 'K'), liczba_mezczyzn = (select count(*)  
from personel
where plec = 'M');

select liczba_kobiet, liczba_mezczyzn from
(select count(*) as liczba_kobiet
 from personel where plec = 'K') as k cross join
 (select count(*) as liczba_mezczyzn
 from personel where plec = 'M') as m;

 -- TOP
select count(case plec when 'K' then 1 else null end) as liczba_kobiet, count(case plec when 'M' then 1 else null end) as liczba_mezczyzn
from personel
--10 b) nie robcie tego w domu
select biura.biuronr, ISNULL(liczba_kobiet, 0) as liczba_kobiet, ISNULL(liczba_mezczyzn, 0) as liczba_mezczyzn
from biura
left join (select biuronr, count(*) as liczba_kobiet
 from personel where plec = 'K'
 group by biuronr) as k 
 on biura.biuroNr = k.biuroNr 
left join
 (select biuronr, count(*) as liczba_mezczyzn
 from personel where plec = 'M'
 group by biuronr) as m
 on biura.biuroNr = m.biuroNr;

select biuroNr, count(case plec when 'K' then 1 else null end) as liczba_kobiet, count(case plec when 'M' then 1 else null end) as liczba_mezczyzn
from personel
group by biuroNr
 --10 c)
select miasto, count(case plec when 'K' then 1 else null end) as liczba_kobiet, count(case plec when 'M' then 1 else null end) as liczba_mezczyzn
from personel
join biura
on personel.biuroNr = biura.biuroNr
group by miasto
--10 d)
select stanowisko, count(case plec when 'K' then 1 else null end) as liczba_kobiet, count(case plec when 'M' then 1 else null end) as liczba_mezczyzn
from personel
group by stanowisko

