const { Pool } = require('pg');
require('dotenv').config();
const {Table, printTable} = require('console-table-printer');
const colors = require('colors');
colors.setTheme({
    mundane: 'grey',
    input: 'green',
    prompt: 'cyan',
    warn: 'yellow',
    error: 'red'
});

const pool = new Pool (
    {
        user: 'postgres',
        password: process.env.DB_PASSWORD,
        host: 'localhost',
        database: 'emp_db'
    },
    console.log('\n+++++++ Connected to the emp_db database. +++++++\n')
)

const getDepts = async () => {
    try {
        const client = await pool.connect();
        const { rows } = await client.query(`SELECT name FROM department`); 
        const deptList = [];
        rows.forEach((dept) => deptList.push(dept.name))
        return deptList;
        
    } catch (err) {
        console.log(err);
    }
};

const getRoles = async () => {
    try {
        const client = await pool.connect();
        const { rows } = await client.query(`SELECT title FROM role`); 
        const roleList = [];
        rows.forEach((role) => roleList.push(role.title))
        return roleList;

    } catch (err) {
        console.log(err);
    }
};

const getEmps = async () => {
    try {
        const client = await pool.connect();
        const { rows } = await client.query(`
            SELECT 
                CONCAT(first_name,' ', last_name) AS name 
            FROM 
                employee`
            ); 
        const empList = [];
        rows.forEach((employee) => empList.push(employee.name))
        return empList;

    } catch (err) {
        console.log(err);
    }
};


const printDepts = async () => {
    try {
        const client = await pool.connect();
        const { rows } = await client.query("SELECT * FROM department");
        console.log('');
        printTable(rows)

    } catch (err) {
        console.log(err)
    }
     
    client.release();
    start();
};

const printRoles = async () => {
    try {
        const client = await pool.connect();
        const { rows } = await client.query(`
            SELECT * FROM role
            JOIN department
            ON role.department_id = department.id`
        )        
        console.log('');
        printTable(rows);

    } catch (err) {
        console.log(err);
    }

    client.release();
    start();
}

const printEmps = async () => {
    try {
        const client = await pool.connect();
        const { rows } = await client.query(`
            SELECT
                employee.id AS emp_id,
                first_name, 
                last_name,
                title,
                salary,
                name AS department, 
                CONCAT(employee.first_name,' ', employee.last_name) AS manager
            FROM
                employee
            JOIN 
                role ON employee.role_id = role.id
            JOIN 
                department ON role.department_id = department.id
            LEFT JOIN
                employee m ON m.id = employee.manager_id`
        )
        console.log('')
        printTable(rows);

    } catch (err) {
        console.log(err);
    }

    client.release();
    start();
}

const addDept = async (name) => {
    try {
        const client = await pool.connect();
        await client.query(`INSERT INTO department (name)`
            `SELECT * FROM department
            `
        )
        // const deptList = [];
        // rows.forEach((dept) => deptList.push(dept.name));
    }
    
   


}

const addRole = async (newRole) => {

}

const addEmp = (newEE) => {

}

const updateEmpRole = (updatedEE) => {

}

module.exports = { Emp_Database }


