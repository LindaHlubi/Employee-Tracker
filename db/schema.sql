DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
	id INTEGER NOT NULL AUTO_INCREMENT, 
    PRIMARY KEY (id),
    name VARCHAR(30)
);

CREATE TABLE roles (
	id INTEGER NOT NULL AUTO_INCREMENT, 
    PRIMARY KEY (id),
    title VARCHAR(30),
    salary DECIMAL(9,2),
    department_id INTEGER(10)
);

CREATE TABLE employee (
	id INTEGER NOT NULL AUTO_INCREMENT, 
    PRIMARY KEY (id),
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER(10) NOT NULL,
    manager_id INTEGER(10) NULL
);
    
