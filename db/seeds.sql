INSERT INTO department (name) 
VALUES  ('Human Resources'),
        ('Customer Service'),
        ('Sales'),
        ('Accounting'),
        ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES  ('Accounts Manager', '100000', (SELECT id FROM department WHERE name = 'Accounting')),
        ('HR Lead', '120000', (SELECT id FROM department WHERE name = 'Human Resources')),
        ('Sales Representative', '30000', (SELECT id FROM department WHERE name = 'Sales')),
        ('Sales Manager', '85000', (SELECT id FROM department WHERE name = 'Sales')),
        ('General Counsel', '185000', (SELECT id FROM department WHERE name = 'Legal')),
        ('Associate General Counsel', '125000', (SELECT id FROM department WHERE name = 'Legal')),
        ('Executive Assistant-HR', ),
        ('Paralegal', ),
        ('Customer Service Lead', ),
        ('Customer Liaison', )
        ('Bookkeeper', ),
        ('Staff Accountants', ),
        ('Executive Assistant-Legal', ),
        ('Executive Assistant-Sales', ),
        ('Executive Assistant-Accounts', ),
        ('Executive Assistant-Call Center', );

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Anna', 'Ackers', (SELECT id FROM role WHERE title = 'Paralegal'), 5),
        ('Betsy', 'Boop', (SELECT id FROM role WHERE title = 'Staff Accountant'), 1),
        ('Charles', 'Coolidge', (SELECT id FROM role WHERE title = 'Accounts Manager'), null),
        ('David', 'Dotson', (SELECT id FROM role WHERE title = 'Sales Representative'), 4),
        ('Eileen', 'Earwig', (SELECT id FROM role WHERE title = 'Sales Manager'), null),
        ('Francis', 'Ford', (SELECT id FROM role WHERE title = 'General Counsel'), null),
        ('George', 'Grove', (SELECT id FROM role WHERE title = 'Associate General Counsel'), 5),
        ('Harold', 'Hopgood', (SELECT id FROM role WHERE title = 'Customer Liaison'), 9),
        ('Isaac', 'Isaacs', (SELECT id FROM role WHERE title = 'Bookeeper'), 1),
        ('Joyce', 'Judd', (SELECT id FROM role WHERE title = 'Executive Assistant-Call Center'), 9),
        ('Karen', 'Krump', (SELECT id FROM role WHERE title = 'Customer Liaison'), 9),
        ('Lucy', 'Lu', (SELECT id FROM role WHERE title = 'Associate General Counsel'), 5),
        ('Maury', 'Maroney', (SELECT id FROM role WHERE title = 'Executive Assistant-HR'), 2),
        ('Nancy', 'Nantucket', (SELECT id FROM role WHERE title = 'Sales Representative'), 4),
        ('Olive', 'Oyle', (SELECT id FROM role WHERE title = 'Paralegal'), 5),
        ('Paulie', 'Polliwog', (SELECT id FROM role WHERE title = 'Executive Assistant-Sales'), 4),
        ('Quincy', 'Quisenberry', (SELECT id FROM role WHERE title = 'HR Lead'), null),
        ('Robyn', 'Redbird', (SELECT id FROM role WHERE title = 'Staff Accountant'), 1),
        ('Sara', 'Smith', (SELECT id FROM role WHERE title = 'Executive Assistant-Legal'), 5),
        ('Tracy', 'Turnabout', (SELECT id FROM role WHERE title = 'Executive Assistant-Accounts'), 1),
        ('Ulysses', 'Underbottom', (SELECT id FROM role WHERE title = 'Customer Service Lead'), null);

