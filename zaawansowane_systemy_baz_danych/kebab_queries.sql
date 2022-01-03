--1 total_profit per employee
select e.id, sum(p.price)
from employee e
left join employee_order eo
on e.id = eo.employee_id
left join product_order po
on eo.order_id = po.order_id
left join product p
on po.product_id = p.id
group by e.id

--2 total number and price of sold products in each product_type


--3 all orders not finished yet + pracownik ktory przyjal zamowienie
select *
from "order"
where realization_time is null

--4 average realization time per employee


--5 average realization time per product


--6 all employees with orders actually assigned to them
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


--9 product with employees which never made this product_type

--10 total profit generated this month


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
select name, count(*) as changes
from product
group by name

--14 calculate price of specific order
select o.id, sum(p.price * po.amount) as price
from "order" o
left join product_order po on o.id = po.order_id
left join product p on po.product_id = p.id
group by o.id
having o.id = 15

--15 calculate sales of specific location
select o.location, sum(p.price * po.amount) as sales
from "order" o
left join product_order po on o.id = po.order_id
left join product p on po.product_id = p.id
group by o.location
having o.location = 'Czestochowa'