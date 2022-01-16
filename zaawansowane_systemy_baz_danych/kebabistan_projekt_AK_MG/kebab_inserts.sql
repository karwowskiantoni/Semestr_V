use kebab;
--Example initial data

if not exists (select * from product)
begin
insert into product ("name", price, "weight", is_vegan, is_archive) values 
	('kebab_hummus', 26.99, 0.2, 'true', 'false'),
	('wrap_pastrami', 24.99, 0.18, 'true', 'false'),
	('kebab_rollo', 12.00, 0.3, 'false', 'false'),
	('kebab_rollo z serem', 14.00, 0.32, 'false', 'false'),
	('kebab_rollo_americano', 14.00, 0.3, 'false', 'false'),
	('kebab_mega_rollo', 22.00, 0.5, 'false', 'false'),
	('kebab_box', 15.00, 0.35, 'false', 'false'),
	('kebab_talerz', 20.00, 0.4, 'false', 'false'),
	('kebab_mega_talerz', 32.00, 0.65, 'false', 'false'),
	('kebab_rollo_fit', 15.00, 0.35, 'false', 'false')
end

if not exists (select * from employee)
begin
insert into employee("name", "salary", "is_busy") values 
	('Marcin Najman', 2550, 'false'),
	('Janusz Baranina', 2200, 'false'),
	('Ahmed Ibn Fadlan', 2400, 'false')
end

if not exists (select * from "order")
begin
	exec createOrder 7, 2, 2, 'Czestochowa';
	exec createOrder 4, 3, 1, 'Bagdad';
	exec createOrder 6, 1, 3, 'Czestochowa';

	waitfor delay '00:00:02';

	exec completeOrder 1;
	exec completeOrder 2;
	exec completeOrder 3;

	exec createOrder 5, 2, 5, 'Czestochowa';

	waitfor delay '00:00:02';

	exec completeOrder 4;

	exec createOrder 9, 2, 1, 'Czestochowa';

	waitfor delay '00:00:05';

	exec completeOrder 5;

	exec createOrder 7, 2, 4, 'Czestochowa';
	exec createOrder 7, 3, 2, 'Bagdad';

	waitfor delay '00:00:02';

	exec completeOrder 6;
	exec completeOrder 7;


	exec createOrder 1, 2, 1, 'Czestochowa';
	exec createOrder 1, 3, 2, 'Bagdad';
	exec createOrder 1, 1, 3, 'Czestochowa';

	waitfor delay '00:00:03';

	exec completeOrder 8;
	exec completeOrder 9;
	exec completeOrder 10;

	exec createOrder 3, 2, 5, 'Czestochowa';
	exec createOrder 7, 3, 1, 'Bagdad';
	exec createOrder 9, 1, 1, 'Czestochowa';
end

