INSERT INTO department (department_name)
VALUES
    ( "Sales" ),
    ( "Engineering" ),
    ( "Finance" ),
    ( "Legal" );

INSERT INTO employee_role (role_title, role_salary, department_id)
VALUES
    ( "Salesperson", 80000, 1 ),
    ( "Sales Lead", 110000, 1 ),
    ( "Software Engineer", 120000, 2 ),
    ( "Lead Engineer", 150000, 2 ),
    ( "Accountant", 125000, 3 ),
    ( "Account Manager", 160000, 3 ),
    ( "Lawyer", 190000, 4 ),
    ( "Legal Team Lead", 250000, 4 );

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ( "Wil", "Villarreal", 2, NULL ),
    ( "Gracie", "Blake", 1, 1 ),
    ( "Eliza", "Winter", 4, NULL ),
    ( "Fergus", "Povey", 3, 3 ),
    ( "Eliza", "Winter", 6, NULL ),
    ( "Niall", "Davies", 5, 5 ),
    ( "Zhane", "Vargas", 8, NULL ),
    ( "Connagh", "Phelps", 7, 7 );