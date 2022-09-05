const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password',
      // MySQL database
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

function loadCLI() {
    async function mainMenuPrompt() {
        let mainPrompt = await inquirer
        .prompt({
        type: "list",
        name: "mainSel",
        message: "What would you like to do?",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update employee role", "exit"]
        })

        if (mainPrompt.mainSel === "view all departments") {
        viewDepartments();
        } else if (mainPrompt.mainSel === "view all roles") {
        viewRoles();
        } else if (mainPrompt.mainSel === "view all employees") {
        viewEmployees();
        } else if (mainPrompt.mainSel === "add a department") {
        addDepartment();
        } else if (mainPrompt.mainSel === "add a role") {
        addRole();
        } else if (mainPrompt.mainSel === "add an employee") {
        addEmployee();
        } else if (mainPrompt.mainSel === "update employee role") {
        updateEmployeeRole();
        } else {
        process.exit();
        };
};

mainMenuPrompt();
};

function viewDepartments() {
    db.query(``, function (err, results) {
        if (err) {
        console.log(err);
        };
        console.table(results);
        loadCLI();
    });
};

function viewRoles() {
    db.query(``, function (err, results) {
        if (err) {
        console.log(err);
        };
        console.table(results);
        loadCLI();
    });
};

function viewEmployees() {
    db.query(`SELECT employees.first_name AS first,
        employees.last_name AS last,
        employee_role.role_title AS role
        FROM employees
        INNER JOIN employee_role
        ON employees.role_id = employee_role.id`, function (err, results) {
        if (err) {
        console.log(err);
        } else {
            console.table(results);
            loadCLI();
        };
    });
};

function addDepartment() {
    db.query(``, function (err, results) {
        if (err) {
        console.log(err);
        };
        console.table(results);
        loadCLI();
    });
};

function addRole() {
    db.query(``, function (err, results) {
        if (err) {
        console.log(err);
        };
        console.table(results);
        loadCLI();
    });
};

function addEmployee() {
    db.query(``, function (err, results) {
        if (err) {
        console.log(err);
        };
        console.table(results);
        loadCLI();
    });
};

function updateEmployeeRole() {
    db.query(``, function (err, results) {
        if (err) {
        console.log(err);
        };
        console.table(results);
        loadCLI();
    });
};

module.exports = { loadCLI, viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole };