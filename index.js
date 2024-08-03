const { default: inquirer } = require('inquire')
const { Emp_Database } = require('./lib/query.js') /* ????? */





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
            name: 'choice'
            choices: options,
        }
    ])
    .then((ans) => {
        if (ans.choice === 'Quit') {
            console.log('++++++++++\n\nGoodbye\n\n++++++++++');
            process.end();
        } else if (ans.choice === 'View all departments') {
            await printDepts();
        } else if (ans.choice === 'View all roles') {
            await  printRoles();
        } else if (ans.choice === 'View all employees') {
            await printEmps();
        } else if (ans.choice === 'Add a department') {
            await addDept(newDept);
        } else if (ans.choice === 'Add a role') {
            await addRole();
        } else if (ans.choice === 'Add an employee') {
            await addEmp();
        } else if (ans.choice === "Update an employee's role") {
            await updateEmpRole();
        } 
    })
};

const promptNewDept = async () => {
    const newDept = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department that you would like to add?',
            name: 'name'
        }
    ]);
    return newDept;
};

const promptNewRole = async () => {
    const departments = await Emp_Database.getDepts();
    const newRole = await inquirer.prompt([
        {
            type: 'input',
            message: "What is the title of the new role that you would like to add?'",
            name: 'title'
        }
        {
            type: 'list',
            message: 'What department will the new role fall under?',
            choices: departments,
            name: 'department'
        }
        {
            type: 'input',
            message: 'What will be the salary for the new role?'
            name: 'salary'
        }
    ]);
    return newRole;
};

const start = 

module.exports = start();