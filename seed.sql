use employees;

INSERT INTO department
    (name)
VALUES
    ('Accounting'),
    ('Engineering'),
    ('Finance'),
    ('Security');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('CPA', 140000, 1),
    ('Senior Accountant', 100000, 1),
    ('Senior Engineer', 250000, 2),
    ('Mechanical Engineer', 160000, 2),
    ('Project Manager', 175000, 3),
    ('CFA', 225000, 3),
    ('Head of Security', 100000, 4),
    ('Patrol', 40000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Ken', 'Nguyen', 1, NULL),
    ('Mike', 'Chen', 2, 1),
    ('Ariel', 'Hernandez', 3, NULL),
    ('Kimberly', 'Patel', 4, 3),
    ('Joshua', 'Redding', 5, NULL),
    ('Maleia', 'Roman', 6, 5),
    ('Bowzer', 'Bowzer', 7, NULL),
    ('Tim', 'Hinske', 8, 7);