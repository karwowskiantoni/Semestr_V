/*--1
select * from kraje;
select * from skocznie;
select * from trenerzy;
select * from uczestnictwa_w_zawodach;
select * from zawodnicy;
select * from zawody;

--2
select count(*) liczba_krajow_bez_skoczka from kraje
join zawodnicy 
on zawodnicy.id_kraju = kraje.id_kraju
where id_skoczka is null;

--3
select count(*) as liczba_zawodnikow, kraj 
from zawodnicy 
join kraje 
on zawodnicy.id_kraju = kraje.id_kraju
group by kraje.kraj;

--4
SELECT *
FROM zawodnicy
WHERE NOT EXISTS
    (SELECT *
     FROM uczestnictwa_w_zawodach
     WHERE uczestnictwa_w_zawodach.id_skoczka = zawodnicy.id_skoczka);
--5
SELECT nazwisko, count(*) as ilosc_zawodow
FROM zawodnicy
JOIN uczestnictwa_w_zawodach
ON zawodnicy.id_skoczka = uczestnictwa_w_zawodach.id_skoczka
GROUP BY zawodnicy.nazwisko;

--6
select uczestnictwa_w_zawodach.id_skoczka, skocznie.nazwa 
from uczestnictwa_w_zawodach 
join zawody 
on uczestnictwa_w_zawodach.id_zawodow = zawody.id_zawodow
join skocznie 
on zawody.id_skoczni = skocznie.id_skoczni;

--7
select nazwisko, DATEDIFF(YEAR, data_ur,GETDATE()) as wiek 
from zawodnicy 
order by wiek;

--8

select nazwisko, DATEDIFF(YEAR, data_ur,MIN(zawody.DATA)) as wiek 
from zawodnicy 
join uczestnictwa_w_zawodach
on uczestnictwa_w_zawodach.id_skoczka = zawodnicy.id_skoczka
join zawody 
on uczestnictwa_w_zawodach.id_zawodow = zawody.id_zawodow
group by zawodnicy.nazwisko, zawodnicy.data_ur;

--9
select nazwa, sedz-k as odleglosc_pomiedzy_punktem_bezpieczenstwa_a_punktem_k 
from skocznie;
--10
select nazwa 
from skocznie
where id_skoczni in (select id_skoczni from zawody) 
and k = (select MAX(k) from skocznie);
--11
select distinct kraje.kraj
from skocznie
join kraje
on skocznie.id_kraju = kraje.id_kraju
right join zawody
on zawody.id_skoczni = skocznie.id_skoczni;
--12
with zawodnik as (
    select zawodnicy.id_skoczka, count(*) as liczba_skokow_we_wlasnym_kraju from zawodnicy
    join uczestnictwa_w_zawodach on zawodnicy.id_skoczka = uczestnictwa_w_zawodach.id_skoczka
    join zawody on uczestnictwa_w_zawodach.id_zawodow = zawody.id_zawodow 
    join skocznie on zawody.id_skoczni = skocznie.id_skoczni
    where zawodnicy.id_kraju = skocznie.id_kraju group by zawodnicy.id_skoczka
) SELECT imie, nazwisko, coalesce(liczba_skokow_we_wlasnym_kraju, 0) as liczba_skokow_we_wlasnym_kraju from zawodnicy 
left join zawodnik on zawodnicy.id_skoczka = zawodnik.id_skoczka;

--13
insert into trenerzy (
id_kraju, imie_t, nazwisko_t, data_ur_t)
values (7, 'Corby', 'Fisher', '1975-07-20');

--14
alter table zawodnicy
add trener int;

--15
update zawodnicy
set trener = 
(select id_trenera 
from trenerzy 
where zawodnicy.id_kraju = trenerzy.id_kraju);

--16
alter table zawodnicy
add FOREIGN KEY (trener) 
references trenerzy(id_trenera); 

--17
update trenerzy 
set data_ur_t = 
(select DATEADD(YEAR, 5, MAX(zawodnicy.data_ur)) 
from zawodnicy
where zawodnicy.trener = trenerzy.id_trenera)
where trenerzy.data_ur_t is NULL;
*/