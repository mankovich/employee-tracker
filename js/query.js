const { Pool } = require('pg');
require('dotenv').config();
const { printTable } = require('console-table-printer');
const { start, promptNewDept, promptNewRole, promptNewEmp, promptUpdateRole } = require('./prompt.js');

const pool = new Pool (
    {
        user: 'postgres',
        password: process.env.DB_PASSWORD,
        host: 'localhost',
        database: 'emp_db'
    },
    console.log('\n+++++++ Connected to the emp_db database. +++++++\n')
)

end = () => {
    pool.end();
}

getDepts = async () => {
    try {
        await pool.connect();
        const { rows } = await pool.query(`SELECT name FROM department`); 
        const deptList = [];
        rows.forEach((dept) => deptList.push(dept.name))
        
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
        
        return empList;

    } catch (err) {
        console.log(err);
    }
    getEmpNA(empList);
};

getEmpNA = (empList) => {
    const empListNA = empList.push('N/A');
    return empListNA;
};

printDepts = async () => {
    try {
        await pool.connect();
        const { rows } = await pool.query("SELECT * FROM department");
        console.log('');
        printTable(rows)

    } catch (err) {
        console.log(err)
    }
     
    pool.release();
    start();
};

printRoles = async () => {
    try {
        await pool.connect();
        const { rows } = await pool.query(`
            SELECT * 
            FROM role
            JOIN department
            ON role.department_id = department.id`
        )        
        console.log('');
        printTable(rows);

    } catch (err) {
        console.log(err);
    }

    pool.release();
    start();
};

printEmps = async () => {
    try {
        await pool.connect();
        const { rows } = await pool.query(`
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
        );

        console.log('')
        printTable(rows);

    } catch (err) {
        console.log(err);
    }

    pool.release();
    start();
};

addDept = async (newDept) => {
    await prompts.promptNewDept();
    const { name } = newDept;
    try {
        await pool.connect();
        await pool.query(`
            INSERT INTO 
                department (name) 
            VALUES 
                ($1)`, [name]
            );
        
        console.log(`New ${name} department added.`);
        await printDepts();

    } catch (err) {
        console.log(err);
    }    
};

addRole = async (newRole) => {
    await prompts.promptNewRole();
    const { title, salary, department } = newRole;
    
    try {
        await pool.connect();
        await pool.query(`
            INSERT INTO 
               rolw (title, salary, department_id) 
            VALUES 
                ($1, $2, (SELECT id FROM department WHERE name = $3))`, [title, salary, department]
            );

        console.log(`New role of ${title} has been added.`);
        await printRoles();

    } catch (err) {
        console.log(err);
    }
};

addEmp = async (newEmp) => {
    await prompts.promptNewEmp();
    const { firstName, lastName, role, manager } = newEmp;
    
    try {
        if (manager === 'N/A') {
            await pool.connect();
            await pool.query(`
                INSERT INTO 
                    employee (first_name, last_name, role_id, manager_id) 
                VALUES 
                    ($1, $2, (SELECT id FROM role WHERE title = $3), null)`, [firstName, lastName, role]
                );
        } else {
            const mgrName = manager.split(' ');
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
                    ($1, $2, (SELECT id FROM role WHERE title = $3), $4)`, [firstName, lastName, role, managerId]
            );
        };

        console.log(`New employee ${firstName} ${lastName} has been successfully added to the database.`);
        
        await printEmps();

    } catch (err) {
        console.log(err);
    }
};

updateEmpRole = async (updatedRole) => {
    await prompts.promptUpdateRole();
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
};

module.exports = { queries };


