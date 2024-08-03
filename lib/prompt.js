const inquirer = require('inquirer')
const colors = require('colors')
colors.setTheme({
    mundane: 'grey',
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

const start = () => {
    inquirer.prompt([
        {
            type: 'list',
            choices: colors.prompt(options),
            message: colors.prompt('What would you like to do?'),
            name: 'choice'
        }
    ])
   .then((ans) => {
        if (ans.choice === 'Quit') {
            console.log(colors.mundane('Goodbye'))
        } else if (ans.choice === 'View all departments') {
            printDepts();
        } else if (ans.choice === 'View all roles') {
            printRoles();
        } else if (ans.choice === 'View all employees') {
            printEmps();
        } else if (ans.choice === 'Add a department') {
            addDept();
        } else if (ans.choice === 'Add a role') {
            addRole();
        } else if (ans.choice === 'Add an employee') {
            addEmp();
        } else if (ans.choice === "Update an employee's role") {
            updateEmpRole();
        } 
    })
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


module.exports = start();