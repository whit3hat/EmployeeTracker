USE employees;

INSERT INTO department
    (name)
VALUES
    ('Human Resources'), 
    ('Engineering'),
    ('Retail'), 
    ('Security'); 

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Director of Talent Development', 140000, 1),
    ('Admin Assistance', 100000, 1),
    ('Senior Engineer', 250000, 2),
    ('Mechanical Engineer', 160000, 2),
    ('Store Manager', 175000, 3),
    ('Area Manager', 225000, 3),
    ('Head of Security', 100000, 4),
    ('Patrol', 40000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Amanda', 'Wood', 1, NULL),
    ('Mike', 'Chen', 2, 1),
    ('Ariel', 'Hernandez', 3, NULL),
    ('Kimberly', 'Patel', 4, 3),
    ('Joshua', 'Redding', 5, NULL),
    ('Maleia', 'Roman', 6, 5),
    ('Bowzer', 'Bowzer', 7, NULL),
    ('Grayson', 'Wood', 8, 7);