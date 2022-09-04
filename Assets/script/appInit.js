const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

function loadCLI() {
    db.query(`SELECT employees.first_name AS first,
    employees.last_name AS last,
    employee_role.role_title AS role
    FROM ??
    INNER JOIN employee_role
    ON employees.role_id = employee_role.id`, "employees", function (err, results) {
    if (err) {
    console.log(err);
    };
    console.log(results);
    });

  return;
};


module.exports = { loadCLI }