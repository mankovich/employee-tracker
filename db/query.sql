-- JOIN query combining content of three tables, less the unnecessary id metadata...BUT leaving manager_id referential values for now because I haven't yet figured out how to populate that column with the names of the employees to whom it refers
SELECT employee.first_name AS first, employee.last_name AS last, role.title AS title, role.salary AS salary, department.name as department, employee.manager_id AS manager_id
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id;