const { default: inquirer } = require('inquirer')
const queries = require('./query.js')

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
        if (ans.choice === 'Quit') {
            printGoodbye();
            return;
        } else if (ans.choice === 'View all departments') {
            queries.printDepts();
        } else if (ans.choice === 'View all roles') {
            queries.printRoles();
        } else if (ans.choice === 'View all employees') {
            queries.printEmps();
        } else if (ans.choice === 'Add a department') {
            queries.addDept();
        } else if (ans.choice === 'Add a role') {
            queries.addRole();
        } else if (ans.choice === 'Add an employee') {
            queries.addEmp();
        } else queries.updateEmpRole();
    })
};

const promptNewDept = async () => {
    const newDept = await inquirer.prompt([
        {
            type: 'input',
            message: '\nWhat is the name of the department that you would like to add?\n',
            name: 'name'
        }
    ]);
    return newDept;
};

const promptNewRole = async () => {
    const departments = await queries.getDepts();
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
    return newRole;
};

const promptNewEmp = async () => {
    const roles = await queries.getRoles();
    const employees = await queries.getEmpNA();

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
    return newEmp;
};

const promptUpdateRole = async () => {
    const roles = await queries.getRoles();
    const employees = await queries.getEmps();

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

module.exports = { start, promptNewDept, promptNewRole, promptNewEmp, promptUpdateRole };
