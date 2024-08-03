const { Pool } = require('pg');
const { printTable, Table } = require('console-table-printer');
const colors = require('colors')
colors.setTheme({
    mundane: 'grey',
    input: 'green',
    prompt: 'cyan',
    warn: 'yellow',
    error: 'red'
})

//setting a class of Emp_Database to establish pool connection with database and contain the SQL logic needed to manipulate the tables in the database 
class Emp_Database {
    constructor() {
        this.pool = new Pool(
            {
                user: 'postgres',
                password: 'password',
                host: 'localhost',
                database: 'emp_db'
            },
            console.log(colors.mundane('-----\nConnected to the emp_db database.\n-----'))
        )
        
        pool.on('error', (err) => {
            console.error(colors.error('Unexpected error on idle client'), err)
            process.exit(-1)
        });
        
        const client = await this.pool.connect()
        const res = await client.query
        console.log(res)
        client.release()  /* ????? FIXME: */
    }

    async printDepts() {
        try {
            const { rows } = await this.pool.query("SELECT * FROM department");
            const deptList = [];
            rows.forEach((dept) => deptList.push(dept.name))
            
            // console.log(deptList)

            console.log('');
            printTable(deptList);
            console.log('');
        } catch (err) {
            console.log(colors.error(err));
        }
    };

    // async showAllDepartments() {
    //     try {
    //       const { rows } = await this.pool.query("SELECT * FROM department");
    //       console.log("");
    //       printTable(rows);
    //       console.log("");
    //     } catch (err) {
    //       console.log(err);
    //     }
    // }

    async printRoles() {

    }

    async printEmps() {

    }

    async addDept(newDept) {

    }

    async addRole(newRole) {

    }

    async addEmp(newEE) {

    }
    
    async updateEmpRole(updatedEE) {

    }

}


module.exports = { Emp_Database }


