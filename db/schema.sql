DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

\c employees_db;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL(9,2) NOT NULL,
    department_id INTEGER NOT NULL,  /**/
    FOREIGN KEY (department_id)
    REFERENCES department.id
    ON DELETE CASCADE /*I would have set null, and not included NOT NULL above, but the README schema directed NOT NULL so??   same as role_id below*/
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER, /* to hold ref to another ee that is this ee's mgr ....  */
    FOREIGN KEY (role_id)
    REFERENCES role.id
    ON DELETE CASCADE
);