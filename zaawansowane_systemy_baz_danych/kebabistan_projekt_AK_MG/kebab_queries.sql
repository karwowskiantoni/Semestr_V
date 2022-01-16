use kebab;

-- Queries useful for testing purposes

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

--1 Get TOTAL profit per employee
select e.name, isnull(sum(p.price), 0) as total_profit
from employee e
left join employee_order eo
on e.id = eo.employee_id
left join product_order po
on eo.order_id = po.order_id
left join product p
on po.product_id = p.id
group by e.id, e.name

--2 Get TOTAL sold quantity and profit of each product
select name, is_archive, isnull(sum(amount), 0) as sold_quantity, isnull(sum(price*amount), 0) as total_profit from product 
left join product_order on product.id = product_order.product_id
group by name, is_archive;

--3 Get all orders that are not finished yet, realization duration, and employee assigned to it
select acceptance_time, DATEDIFF(minute, acceptance_time, GETDATE()) as minutes_in_progress, employee.id as employee_id, employee.name as employee_name, product.id as product_id, product.name as product_name, amount
from "order" 
left join employee_order on employee_order.order_id = "order".id
left join employee on employee.id = employee_id
left join product_order on product_order.order_id = "order".id
left join product on product.id = product_id
where realization_time is null

--4 Get average order realization time per employee (milisecond due to inserts time)
select employee.id, "name", avg(datediff(MILLISECOND, acceptance_time, realization_time)) as avg_realization_time_in_milis
from employee
left join employee_order on employee.id = employee_id
left join "order" on order_id = "order".id
where realization_time is not null
group by employee.id, "name";

--5 Get average realization time per product
select product.id, "name", avg(datediff(MILLISECOND, acceptance_time, realization_time)) as avg_realization_time_in_milis
from product
left join product_order on product.id = product_id
left join "order" on order_id = "order".id
where realization_time is not null
group by product.id, "name";

--6 Get employees with ALL orders which were and are assigned to them
select e.id as employee_id, e.name, e.salary, o.id as order_id, o.acceptance_time, o.realization_time, o.location
from employee e
left join employee_order eo on eo.employee_id = e.id
left join "order" o on o.id = eo.order_id

--7 Get number of finished orders per employee
select e.id, e.name, e.salary, (select count(*) 
from employee_order eo 
left join "order" o on o.id = eo.order_id 
where o.realization_time is not null and eo.employee_id = e.id) as completed_orders
from employee e

--8 Get number of finished products per employee
select employee_id, po.product_id, sum(amount) as amount
from product_order po
left join employee_order eo on po.order_id = eo.order_id
group by po.product_id, eo.employee_id

--9 Get product with employees who never made this product
with product_employee as (
select cast(po.product_id as varchar) + cast(eo.employee_id as varchar) as prod_and_employee
from product_order po
left join employee_order eo on eo.order_id = po.order_id)
select p.id as product_id, p.name as product_name, e.id as employee_id, e.name as employee_name
from product p, employee e
where cast(p.id as varchar) + cast(e.id as varchar) not in (select * from product_employee)

--10 Get TOTAL profit generated this month
select sum(po.amount * p.price) as this_month_profit
from "order" o
left join product_order po on o.id = po.order_id
left join product p on p.id = po.product_id
where DATEDIFF(year, GETDATE(), acceptance_time) = 0 
and DATEDIFF(month, GETDATE(), acceptance_time) = 0 
and DATEDIFF(year, GETDATE(), realization_time) = 0 
and DATEDIFF(month, GETDATE(), realization_time) = 0

--11 Get weight / price proportion per each product
select id, name, round(weight/price, 3) as weight_price_proportion
from product

--12 Get vegan orders/all orders percent
select cast(100.0*(select count(*)
from product_order po
left join product p on p.id = po.product_id
where p.is_vegan = 'True')/(select count(*)
from product_order)as int) as '%_of_vegan_orders'

--13 Get number of product changes per specific name (group by name)
select name, count(*) - 1 as changes
from product
group by name

--14 Calculate price of specific order
select o.id, sum(p.price * po.amount) as price
from "order" o
left join product_order po on o.id = po.order_id
left join product p on po.product_id = p.id
group by o.id
having o.id = 10

--15 Calculate sales of specific location
select o.location, sum(p.price * po.amount) as sales
from "order" o
left join product_order po on o.id = po.order_id
left join product p on po.product_id = p.id
group by o.location
