const inquirer = require('inquirer')
const colors = require('colors')

/* instead of const pg = require('pg'), this from the pg documentation: */
import pg from 'pg'
const { Client } = pg
const client = new Client()
await client.connect()

const res = await client.query()
await client.end()

const initialOptions = [
    'View all departments',
    'View all roles',
    'View all employees',
    'Add a department',
    'Add a role',
    'Add an employee',
    'Update an employee role'
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