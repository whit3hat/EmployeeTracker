-- Database commands for the Employee Tracker Assignment

-- CREATE DATABASE companyinfo_db;

-- use companyinfo_db;

-- CREATE TABLE department (
-- id INT NOT NULL AUTO_INCREMENT,
-- name VARCHAR(30),
-- PRIMARY KEY (id) 
-- );

-- CREATE TABLE role (
-- id INT NOT NULL AUTO_INCREMENT,
-- title VARCHAR(30),
-- salary decimal,
-- department_id INT,
-- PRIMARY KEY (id)
-- );

-- CREATE TABLE employee (
-- id INT AUTO_INCREMENT NOT NULL,
-- first_name VARCHAR(30) NOT NULL,
-- last_name VARCHAR(30) NOT NULL,
-- role_id INT NOT NULL,
-- manager_id INT,
-- PRIMARY KEY (id)
-- );

INSERT INTO department (name) VALUES ("Human Resources");


INSERT INTO role (title, salary, department_id) VALUES ("Manager",  );


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Grayson", "Spencer", "relaxed");
