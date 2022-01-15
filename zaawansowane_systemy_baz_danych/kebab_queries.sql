use kebab;

--queries useful for testing purposes

--delete from product where id = 1
--update product set price = 10 where name = 'kebab_rollo'
--exec completeOrder 11;
--exec createOrder 11, 2, 1, 'Czestochowa';
--exec completeOrder 1;
--exec increase_best_employee_salary '2022-01-17', '2022-01-18';


select * from product;
select * from employee;
select * from "order";
select * from product_order;
select * from employee_order;

--1 total_profit per employee
select e.name, isnull(sum(p.price), 0) as total_profit
from employee e
left join employee_order eo
on e.id = eo.employee_id
left join product_order po
on eo.order_id = po.order_id
left join product p
on po.product_id = p.id
group by e.id, e.name

--2 total number and price of sold products in each product
select name, is_archive, isnull(sum(amount), 0) as total_number, isnull(sum(price*amount), 0) as total_profit from product 
left join product_order on product.id = product_order.product_id
group by name, is_archive;

--3 all orders not finished yet + pracownik ktory przyjal zamowienie
select acceptance_time, employee.name,  product.name, amount
from "order" 
left join employee_order on employee_order.order_id = "order".id
left join employee on employee.id = employee_id
left join product_order on product_order.order_id = "order".id
left join product on product.id = product_id
where realization_time is null

--4 average realization time per employee
select "name", avg(datediff(MILLISECOND, acceptance_time, realization_time)) as time_in_milis from employee
left join employee_order on employee.id = employee_id
left join "order" on order_id = "order".id
where realization_time is not null
group by "name";


--5 average realization time per product
select "name", avg(datediff(MILLISECOND, acceptance_time, realization_time)) as time_in_milis from product
left join product_order on product.id = product_id
left join "order" on order_id = "order".id
where realization_time is not null
group by "name";

--6 all employees with orders assigned to them
select e.id, e.name, e.salary, e.is_busy, o.id, o.acceptance_time, o.realization_time, o.location
from employee e
left join employee_order eo on eo.employee_id = e.id
left join "order" o on o.id = eo.order_id

--7 number of orders finished per employee
select *, (select count(*) 
from employee_order eo 
left join "order" o on o.id = eo.order_id 
where o.realization_time is not null and eo.employee_id = e.id) as completed_orders
from employee e

--8 most times finished product per employee

--9 product with employees which never made this product

--10 total profit generated this month
select * from order where

--11 weight / price proportion per each product
select id, name, round(weight/price, 3) as weight_price_proportion
from product

--12 employees which made only vegan products
--12b percent of orders which was only vegans
select *
from employee e
left join employee_order eo on eo.employee_id = e.id
left join product_order po on eo.order_id = eo.order_id
left join product p on p.id = po.product_id
where p.is_vegan = 'False'

--13 number of product changes per specific name (group by name)
select name, count(*) - 1 as changes
from product
group by name

--14 calculate price of specific order
select o.id, sum(p.price * po.amount) as price
from "order" o
left join product_order po on o.id = po.order_id
left join product p on po.product_id = p.id
group by o.id
having o.id = 10

--15 calculate sales of specific location
select o.location, sum(p.price * po.amount) as sales
from "order" o
left join product_order po on o.id = po.order_id
left join product p on po.product_id = p.id
group by o.location



