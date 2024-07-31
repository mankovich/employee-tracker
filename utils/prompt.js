const inquirer = require('inquirer')
const colors = require('colors')


const initialOptions = [
    'View all departments',
    'View all roles',
    'View all employees',
    'Add a department',
    'Add a role',
    'Add an employee',
    'Update an employee role',
    'Quit'
];

function chooseTask() {
    inquirer.prompt([
        {
            type: 'list',
            choices: initialOptions,
            message: colors.pink('What would you like to do?'),
            name: 'options'
        }
    ])
    /* TODO: what do I do next with the answer?? .then(choice) => ....? return choice?? I have no clue....*/
};

//function call to initialize initial inquirer prompt
chooseTask();