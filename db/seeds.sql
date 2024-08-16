INSERT INTO department (name) 
VALUES  ('Human Resources'),
        ('Customer Service'),
        ('Sales'),
        ('Accounting'),
        ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES  ('Accounts Manager', '125000', (SELECT id FROM department WHERE name = 'Accounting')),
        ('HR Lead', '120000', (SELECT id FROM department WHERE name = 'Human Resources')),
        ('Sales Representative', '45000', (SELECT id FROM department WHERE name = 'Sales')),
        ('Sales Manager', '95000', (SELECT id FROM department WHERE name = 'Sales')),
        ('General Counsel', '215000', (SELECT id FROM department WHERE name = 'Legal')),
        ('Associate General Counsel', '145000', (SELECT id FROM department WHERE name = 'Legal')),
        ('Executive Assistant-HR', '30000', (SELECT id FROM department WHERE name = 'Human Resources')),
        ('Paralegal', '70000', (SELECT id FROM department WHERE name = 'Legal')),
        ('Customer Service Lead', '120000', (SELECT id FROM department WHERE name = 'Customer Service')),
        ('Customer Liaison', '55000', (SELECT id FROM department WHERE name = 'Customer Service')),
        ('Bookkeeper', '55000', (SELECT id FROM department WHERE name = 'Accounting')),
        ('Staff Accountant', '105000', (SELECT id FROM department WHERE name = 'Accounting')),
        ('Executive Assistant-Legal', '40000', (SELECT id FROM department WHERE name = 'Legal')),
        ('Executive Assistant-Sales', '30000', (SELECT id FROM department WHERE name = 'Sales')),
        ('Executive Assistant-Accounts', '40000', (SELECT id FROM department WHERE name = 'Accounting')),
        ('Executive Assistant-Call Center', '30000', (SELECT id FROM department WHERE name = 'Customer Service'));

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Anna', 'Ackers', (SELECT id FROM role WHERE title = 'Paralegal'), 6),
        ('Betsy', 'Boop', (SELECT id FROM role WHERE title = 'Staff Accountant'), 3),
        ('Charles', 'Coolidge', (SELECT id FROM role WHERE title = 'Accounts Manager'), null),
        ('David', 'Dotson', (SELECT id FROM role WHERE title = 'Sales Representative'), 5),
        ('Eileen', 'Earwig', (SELECT id FROM role WHERE title = 'Sales Manager'), null),
        ('Francis', 'Ford', (SELECT id FROM role WHERE title = 'General Counsel'), null),
        ('George', 'Groove', (SELECT id FROM role WHERE title = 'Associate General Counsel'), 6),
        ('Harold', 'Hopgood', (SELECT id FROM role WHERE title = 'Customer Liaison'), 21),
        ('Isaac', 'Isaacs', (SELECT id FROM role WHERE title = 'Bookkeeper'), 3),
        ('Joyce', 'Judd', (SELECT id FROM role WHERE title = 'Executive Assistant-Call Center'), 21),
        ('Karen', 'Krump', (SELECT id FROM role WHERE title = 'Customer Liaison'), 21),
        ('Lucy', 'Lu', (SELECT id FROM role WHERE title = 'Associate General Counsel'), 6),
        ('Maury', 'Maroney', (SELECT id FROM role WHERE title = 'Executive Assistant-HR'), 17),
        ('Nancy', 'Nantucket', (SELECT id FROM role WHERE title = 'Sales Representative'), 5),
        ('Olive', 'Oyle', (SELECT id FROM role WHERE title = 'Paralegal'), 6),
        ('Paulie', 'Polliwog', (SELECT id FROM role WHERE title = 'Executive Assistant-Sales'), 5),
        ('Quincy', 'Quisenberry', (SELECT id FROM role WHERE title = 'HR Lead'), null),
        ('Robyn', 'Redbird', (SELECT id FROM role WHERE title = 'Staff Accountant'), 3),
        ('Sara', 'Serefin', (SELECT id FROM role WHERE title = 'Executive Assistant-Legal'), 6),
        ('Tracy', 'Turnabout', (SELECT id FROM role WHERE title = 'Executive Assistant-Accounts'), 3),
        ('Ulysses', 'Underbottom', (SELECT id FROM role WHERE title = 'Customer Service Lead'), null);

