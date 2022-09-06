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
    db.query(`SELECT department.department_name AS department
        FROM department`, function (err, results) {
        if (err) {
        console.log(err);
        };
        console.table(results);
        loadCLI();
    });
};

function viewRoles() {
    db.query(`SELECT employee_role.role_title AS role,
        employee_role.role_salary AS salary,
        department.department_name as department
        FROM employee_role
        INNER JOIN department
        ON employee_role.department_id = department.id`, function (err, results) {
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
        employee_role.role_title AS department,
        employee_role.role_salary AS salary,
        employees.manager_id AS manager
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
    async function newDepartment() {
        const newDepartmentPrompt = await inquirer
        .prompt({
            type: "input",
            name: "deptName",
            message: "What is the name of the new department?"
        })
        db.query(`INSERT INTO department (department_name)
            VALUES ( "${newDepartmentPrompt.deptName}" )`, function (err, results) {
            if (err) {
            console.log(err);
            };
            viewDepartments();
        });
    };
    newDepartment();
};

function addRole() {
    async function newRole() {
        const newRolePrompt = await inquirer
        .prompt([
            {
            type: "input",
            name: "roleName",
            message: "What is the title of the new role?"
            },
            {
            type: "input",
            name: "roleSalary",
            message: "What is the salary of the new role?"
            },
            {
            type: "input",
            name: "roleDepartment",
            message: "What is the id of the department associated with that role?"
            },

        ])
        db.query(`INSERT INTO employee_role (role_title, role_salary, department_id)
            VALUES 
                ( "${newRolePrompt.roleName}", ${newRolePrompt.roleSalary}, ${newRolePrompt.roleDepartment} ) `, function (err, results) {
            if (err) {
            console.log(err);
            };
            viewRoles();
        });
    };
    newRole();
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
    const empArr = [];
    const roleArrName = [];
    let roleIndex;
    function setEmpArr() {
        db.query(`SELECT employees.first_name AS first,
        employees.last_name AS last
        FROM employees`, 
        function (err, results) {
            if (err) {
                console.log(err);
            };
            results.forEach(el => {
                let currentEmp = "";
                currentEmp += el.first + " " + el.last;
                empArr.push(currentEmp);
            });
            setRoleArr();
        });
    };

    function setRoleArr() {
        let currentName;
        db.query(`SELECT employee_role.role_title AS role
        FROM employee_role`, 
        function (err, results) {
            if (err) {
                console.log(err);
            };
            results.forEach(el => {
                currentName = el.role;
                roleArrName.push(currentName);
            });
            changeRole();
        });
    };

    async function changeRole() {
        let changeRolePrompt = await inquirer
        .prompt([
            {
            type: "list",
            name: "empSel",
            message: "Which employee are you updating?",
            choices: empArr
            },
            {
            type: "list",
            name: "roleSel",
            message: "Which role are they becoming?",
            choices: roleArrName
            }
        ]);
        getIndex(changeRolePrompt);
    };

    function runUpdateQuery(changeRolePrompt) {
        const nameStr = changeRolePrompt.empSel
        const nameArr = nameStr.split(" ");
        console.log(roleIndex);
        db.query(`UPDATE employees
        SET role_id = ?
        WHERE employees.first_name = ? AND employees.last_name = ?`, [roleIndex, nameArr[0], nameArr[1]], function (err, results) {
            if (err) {
            console.log(err);
            };
            loadCLI();
        });
    };

    function getIndex(changeRolePrompt) {
        db.query(`SELECT employee_role.id AS roleid
        FROM employee_role
        WHERE role_title = ?`, changeRolePrompt.roleSel, function (err, results) {
            if (err) {
            console.log(err);
            };
            roleIndex = results[0].roleid;
            runUpdateQuery(changeRolePrompt);
        });
    };

    setEmpArr();
};

module.exports = { loadCLI, viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole };