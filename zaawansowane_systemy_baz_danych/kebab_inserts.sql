use kebab;

insert into product ("name", price, "weight", is_vegan, is_archive) values ('kebab_hummus', 26.99, 0.2, 'true', 'false')
insert into product ("name", price, "weight", is_vegan, is_archive) values ('wrap_pastrami', 24.99, 0.18, 'true', 'false')
insert into product ("name", price, "weight", is_vegan, is_archive) values ('kebab_rollo', 12.00, 0.3, 'false', 'false')
insert into product ("name", price, "weight", is_vegan, is_archive) values ('kebab_rollo z serem', 14.00, 0.32, 'false', 'false')
insert into product ("name", price, "weight", is_vegan, is_archive) values ('kebab_rollo_americano', 14.00, 0.3, 'false', 'false')
insert into product ("name", price, "weight", is_vegan, is_archive) values ('kebab_mega_rollo', 22.00, 0.5, 'false', 'false')
insert into product ("name", price, "weight", is_vegan, is_archive) values ('kebab_box', 15.00, 0.35, 'false', 'false')
insert into product ("name", price, "weight", is_vegan, is_archive) values ('kebab_talerz', 20.00, 0.4, 'false', 'false')
insert into product ("name", price, "weight", is_vegan, is_archive) values ('kebab_mega_talerz', 32.00, 0.65, 'false', 'false')
insert into product ("name", price, "weight", is_vegan, is_archive) values ('kebab_rollo_fit', 15.00, 0.35, 'false', 'false')

insert into employee("name", "salary", "is_busy") values ('Marcin Najman', 2550, 'false')
insert into employee("name", "salary", "is_busy") values ('Janusz Baranina', 2200, 'false')
insert into employee("name", "salary", "is_busy") values ('Ahmed Ibn Fadlan', 2400, 'false')

insert into "order"("acceptance_time", "realization_time", "location") values (DATETIMEFROMPARTS(2021, 12, 1, 21,37, 22,0), DATETIMEFROMPARTS(2021, 12, 1, 21,43, 12,0), 'Czestochowa')
insert into "order"("acceptance_time", "realization_time", "location") values (DATETIMEFROMPARTS(2021, 12, 1, 10,24, 50,0), DATETIMEFROMPARTS(2021, 12, 1, 10,31, 17,0), 'Czestochowa')
insert into "order"("acceptance_time", "realization_time", "location") values (DATETIMEFROMPARTS(2021, 12, 1, 18,11, 34,0), DATETIMEFROMPARTS(2021, 12, 1, 18,19, 46,0), 'Czestochowa')
insert into "order"("acceptance_time", "realization_time", "location") values (DATETIMEFROMPARTS(2021, 12, 6, 11,11, 11,11), DATETIMEFROMPARTS(2021, 12, 6, 11,21, 11,0), 'Czestochowa')
insert into "order"("acceptance_time", "realization_time", "location") values (DATETIMEFROMPARTS(2021, 12, 9, 15,14, 0,0), DATETIMEFROMPARTS(2021, 12, 9, 15,20, 0,0), 'Czestochowa')
insert into "order"("acceptance_time", "realization_time", "location") values (DATETIMEFROMPARTS(2021, 12, 8, 12,15, 0,0), DATETIMEFROMPARTS(2021, 12, 8, 12,19, 46,0), 'Czestochowa')
insert into "order"("acceptance_time", "realization_time", "location") values (DATETIMEFROMPARTS(2021, 12, 3, 9,46, 34,0), DATETIMEFROMPARTS(2021, 12,3, 10,20, 11,0), 'Lodz')
insert into "order"("acceptance_time", "realization_time", "location") values (DATETIMEFROMPARTS(2021, 12, 3, 9,47, 41,0), DATETIMEFROMPARTS(2021, 12, 3, 9,54, 54,0), 'Lodz')
insert into "order"("acceptance_time", "realization_time", "location") values (DATETIMEFROMPARTS(2021, 12, 4, 8,19, 1,0), DATETIMEFROMPARTS(2021, 12, 4, 8,30, 2,0), 'Lodz')
insert into "order"("acceptance_time", "realization_time", "location") values (DATETIMEFROMPARTS(2021, 12, 5, 14,55, 0,0), DATETIMEFROMPARTS(2021, 12, 5, 14,57, 0,0), 'Bagdad')


-- przyk³adowe dane do wszystkich tabel
--	 10 product_type
--	 10 order
--	 3 employee  