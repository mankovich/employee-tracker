INSERT INTO department (name) 
VALUES  ('Human Resources')
        ('Customer Service')
        ('Sales')
        ('Accounting')
        ('Legal')

INSERT INTO role (title, salary, department_id)
VALUES  ('Accounts manager', '100000', 4),
        ('HR manager', '120000', 1),
        ('Sales rep', '30000', 3),
        ('Sales manager', '85000', 3),
        ('General Counsel', '185000', 5),
        ('Associate General Counsel', '125000', 5)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Sara', 'Smith', 6, 5),
        ('Charles', 'Coolidge', 1),
        ('David', 'Dotson', 3, 4),
        ('Eileen', 'Earwig', 4),
        ('Francis', 'Ford', 5),
        ('George', 'Grove', 6, 5)