const colors = require('colors');
const { Pool } = require('pg');
require('dotenv').config();
const inquirer = require('inquirer')
const { printTable } = require('console-table-printer')

const pool = new Pool (
    {
        user: 'postgres',
        password: process.env.DB_PASSWORD,
        host: 'localhost',
        database: 'emp_db'
    },
)

getDepts = async () => {
    try {
        const client = await pool.connect()
        const rows = await client.query(`SELECT name FROM department`); 
        const deptList = [];
        deptList.push(rows.name)
        
        return deptList;

    } catch (err) {
        console.log(err);
    }
};

getRoles = async () => {
    try {
        await pool.connect();
        const { rows } = await pool.query(`SELECT title FROM role`); 
        const roleList = [];
        rows.forEach((role) => roleList.push(role.title))
       
        return roleList;

    } catch (err) {
        console.log(err);
    }
};

getEmps = async () => {
    try {
        await pool.connect();
        const { rows } = await pool.query(`
            SELECT 
                CONCAT(first_name,' ', last_name) AS name 
            FROM 
                employee`
            ); 
        const empList = [];
        rows.forEach((employee) => empList.push(employee.name))
        
        getEmpNA(empList);

    } catch (err) {
        console.log(err);
    }
};

getEmpNA = async () => {
    const empListNA = await empList.push('N/A');
    return empListNA;
};

printDepts = async () => {
    try {
        const client = await pool.connect();
        const { rows } = await client.query("SELECT * FROM department");
        
        printTable(rows);
    
        client.release();
        start();

    } catch (err) {
        console.log(err)
    }
};

printRoles = async () => {
    try {
        const client = await pool.connect();
        const { rows } = await client.query(`
            SELECT * 
            FROM role
            LEFT JOIN department
            ON role.department_id = department.id`
        )        
        
        printTable(rows);

        client.release();
        start();

    } catch (err) {
        console.log(err);
    }
};

printEmps = async () => {
    try {
        const client = await pool.connect();
        const { rows } = await client.query(`
            SELECT
                employee.id AS emp_id,
                employee.first_name, 
                employee.last_name,
                role.title,
                role.salary,
                department.name AS department 
            FROM
                employee
            JOIN 
                role ON employee.role_id = role.id
            JOIN 
                department ON role.department_id = department.id`
        );

        printTable(rows);
        client.release;
        start();

    } catch (err) {
        console.log(err);
    }
};

addDept = async () => {
    const newDept = await inquirer.prompt([
        {
            type: 'input',
            message: '\nWhat is the name of the department that you would like to add?\n',
            name: 'name'
        }
    ]);
    
    try {
        const client = await pool.connect();
        await client.query(`
            INSERT INTO 
                department (name) 
            VALUES 
                ($1)`, [newDept.name]
            );
        
        console.log(colors.green(`\n\nNew ${newDept.name} department added.\n\n`));
        await printDepts();
        start()
    } catch (err) {
        console.log(err);
    } 
};

addRole = async () => {
    const departments = await getDepts();
    const newRole = await inquirer.prompt([
        {
            type: 'input',
            message: "\nWhat is the title of the new role that you would like to add?'",
            name: 'title'
        },
        {
            type: 'list',
            message: 'What department will the new role fall under?',
            choices: departments,
            name: 'department'
        },
        {
            type: 'input',
            message: 'What will be the salary for the new role?\n',
            name: 'salary'
        }
    ]);
    
    try {
        const client = await pool.connect();
        await client.query(`
            INSERT INTO 
               role (title, salary, department_id) 
            VALUES 
                ($1, $2, (SELECT id FROM department WHERE name = $3))`, [newRole.title, newRole.salary, newRole.department]
            );

        console.log(colors.green(`\n\nNew role of ${newRole.title} has been added.\n\n`));
        await printRoles();
        start();

    } catch (err) {
        console.log(err);
    }
    
};

addEmp = async () => {
    const roles = await getRoles();
    const employees = await getEmpNA();

    const newEmp = await inquirer.prompt([
        {
            type: 'input',
            message: "\nWhat is the new employee's first name?'",
            name: 'firstName'
        },
        {
            type: 'input',
            message: "What is the new employee's last name?'",
            name: 'lastName'
        },
        {
            type: 'list',
            message: "What will be the new employee's role?",
            name: 'role',
            choices: roles
        },
        {
            type: 'list',
            message: "Who will be the new employee's manager?\n",
            name: 'manager',
            choices: employees
        }
    ]);

    try {
        const client = await pool.connect()
        if (newEmp.manager === 'N/A') {
            await client.query(`
                INSERT INTO 
                    employee (first_name, last_name, role_id, manager_id) 
                VALUES 
                    ($1, $2, (SELECT id FROM role WHERE title = $3), null)`, [newEmp.firstName, newEmp.lastName, newEmp.role]
                );
        } else {
            const mgrName = newEmp.manager.split(' ');
            const managerId = (await pool.query(`
                SELECT 
                    id 
                FROM 
                    employee 
                WHERE 
                    first_name = $1 AND last_name = $2`, [...mgrName]
            ));
            await pool.query(`
                INSERT INTO 
                    employee (first_name, last_name, role_id, manager_id)
                VALUES
                    ($1, $2, (SELECT id FROM role WHERE title = $3), $4)`, [newEmp.firstName, newEmp.lastName, newEmp.role, managerId]
            );
        };

        console.log(colors.green(`\n\nNew employee ${firstName} ${lastName} has been successfully added to the database.\n\n`));
        
        await printEmps();
        start()

    } catch (err) {
        console.log(err);
    }
};

updateEmpRole = async (updatedRole) => {
    await promptUpdateRole();
    const { name, role } = updatedRole;
    const empName = name.split(' ');

    try {
        await pool.connect()
        const roleId = (await pool.query(`
            SELECT
                id
            FROM
                role
            WHERE
                title = $1`, [role]
        ));
        await pool.query(`
            UPDATE
                employee
            SET
                role_id = $1
            WHERE
                first_name = $2 AND last_name = $3`, [roleId, ...empName]
        );

        console.log(`Employee ${name}'s job title has been updated to ${title}.`);
        
        await printEmps();

    } catch (err) {
        console.log(err)
    };
    start()
};

function handleChoice(choice) {
    switch(choice) {
        case 'View all departments':
            printDepts();
            return
        case 'View all roles':
            printRoles();
            return
        case 'View all employees':
            printEmps();
            return
        case 'Add a department':
            addDept();
            return
        case 'Add a role':
            addRole();
            return
        case 'Add an employee':
            addEmp();
            return
        case "Update an employee's role":
            updateEmpRole();
            return
        case 'Quit':
            goodbye();
            
    }
}

//set variable options as an array strings of each options presented to the user
const options = [
    'View all departments',
    'View all roles',
    'View all employees',
    'Add a department',
    'Add a role',
    'Add an employee',
    "Update an employee's role",
    'Quit'
];

const start = async () => {
    await inquirer.prompt([
        {
            type: 'list',
            message: '\nWhat would you like to do?\n',
            name: 'choice',
            choices: options,
        }
    ])
    .then((ans) => {
        handleChoice(ans.choice)
    })
};

const promptUpdateRole = async () => {
    const roles = await getRoles();
    const employees = await getEmps();

    const updatedRole = await inquirer.prompt([
        {
            type: 'list',
            message: "\nWhich employee is getting a new role?'",
            name: 'employee',
            choices: employees
        },
        {
            type: 'list',
            message: "What will be the employee's new role?\n",
            name: 'title',
            choices: roles
        }
    ]);
    return updatedRole;
}

function printWelcome() {
    console.log(colors.magenta(`\n\n\n==================================================\n\nHello and welcome to the user command-line \ninterface for this employee tracker.\n\n==================================================`
    ))
};

function goodbye() {
    console.log(colors.magenta(`\n\n\n========================================\n\nGoodbye.\n\n========================================`
    ));
    process.exit();
};

function init() {
    printWelcome();
    start();
};

init();
