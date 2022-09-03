DROP DATABASE IF EXISTS company_db;
CREATE DATABASE IF NOT EXISTS company_db;

USE company_db;

CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE employee_role (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role_title VARCHAR(30) NOT NULL,
    role_salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY(department_id)
    REFERENCES department(id)
    ON DELETE CASCADE
);

CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY(role_id)
    REFERENCES employee_role(id)
    ON DELETE CASCADE,
    FOREIGN KEY(manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);