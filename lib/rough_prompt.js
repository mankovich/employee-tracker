const inquirer = require('inquirer')
const colors = require('colors')
colors.setTheme({
    table: 'grey',
    input: 'green',
    prompt: 'cyan',
    warn: 'yellow',
    error: 'red'
})


//set variable options as an array strings of each options presented to the user
const options = [
    colors.prompt('View all departments'),
    colors.prompt('View all roles'),
    colors.prompt('View all employees'),
    colors.prompt('Add a department'),
    colors.prompt('Add a role'),
    colors.prompt('Add an employee'),
    colors.prompt("Update an employee's role"),
    colors.prompt('Quit')
];

async function chooseTask(emp_database) {
    while (true) {

        const choice = await inquirer.prompt([
            {
                type: 'list',
                choices: colors.prompt(options),
                message: colors.prompt('What would you like to do?'),
                name: 'task'
            }
        ])

        switch (choice.task) {
            case 'View all departments':
                await emp_database.printDepts()
                break;
            case 'View all roles':
                await emp_database.printRoles()
                break;
            case 'View all employees':
                await emp_database.printEEs()
                break;
            case 'Add a department':
                const newDept = await promptNewDept(/* he had nothing */)
                await emp_database.insertNewDept(newDept)
                break;
            case 'Add a role':
                const newRole = await promptNewRole(/* employee_db is what he had */)
                await emp_database.insertNewRole(newRole)
                break;
            case 'Add an employee':
                const newEE = await promptNewEE(/* employee_db is what he had */)
                await emp_database.insertNewEE(newEE);
                break;
            case "Update an employee's role":
                const updatedEE = await defineEmpToUpdate(emp_database)
                await emp_database.updateRole(updatedEE);
                break;
            case 'Quit':
                return;
        }
    }
};

async function promptNewDept() {
    const newDept = await inquirer.prompt([
        {
            type: colors.input('input'),
            message: colors.prompt('What is the name of the department that you would like to add?'),
            name: 'name'
        }
    ]);
    return newDept.name;
};

async function promptNewRole(emp_database) {
    const depts = await emp_database.arrayDepts()
    const newRole = await inquirer.prompt([
        {
            type: colors.input('input'),
            message: colors.prompt('What is the name of the new role you would like to add?'),
            name: 'title'
        },
        {
            type: colors.input('list'),
            choices: depts,
            message: colors.prompt("What is the new role's department?"),
            name: 'dept'
        }
    ]);
    console.log(newRole)
    return newRole
}

async function promptNewEE(emp_database) {
    const roles = await emp_database.arrayRoles();
    const mgrs = await emp_database.arrayEEs(); /* FIXME: */

    const newEE = await inquirer.prompt([
        {
            type: colors.input('input'),
            message: colors.prompt("What is the new employee's first name?"),
            name: 'firstName'
        },
        {
            type: colors.input('input'),
            message: colors.prompt("What is the new employee's last name?"),
            name: 'lastName'
        },
        {
            type: colors.prompt('list'),
            message: colors.prompt("What will be the new employee's role?"),
            name: 'role',
            choices: colors.prompt(roles),
        },
        {
            type: colors.prompt('list'),
            message: colors.prompt("Who will be the new employee's manager?"),
            name: 'manager',
            choices: colors.prompt(mgrs)
        }
    ]);
    console.log(newEE)
    return newEE
}

async function defineEmpToUpdate(emp_database) {
    const roles = await emp_database.arrayRoles()
    const employees = await arrayEEs();

    const updatedEE = await inquirer.prompt([
        {
            type: colors.prompt('list'),
            message: colors.prompt("Which employee's role is changing?"),
            name: 'name',
            choices: colors.prompt(employees)
        },
        {
            type: colors.prompts('list'),
            message: colors.prompt("What is the employee's new role?"),
            name: 'role',
            choices: colors.prompt(roles)
        }
    ])
    console.log(updatedEE)
    return updatedEE
}

module.exports = { chooseTask } 
