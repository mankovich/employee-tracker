const { Pool } = require('pg');
const printTable = require('console-table-printer');
const colors = require('colors')
colors.setTheme({
    table: 'grey',
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
            console.log(colors.warn('-----\nConnected to the emp_db database.\n-----'))
        )
        // await pool.connect() 
        /* ?????? */
        // await pool.end()
    }

    async printDepts() {

    }

    // *  async getDept()
    // *  Get the currently available departments from the DB
    // *  @returns {array} contains the names of the departments 
    // */
     
    // async getDept() {
    //    try {
    //      const { rows } = await this.pool.query("SELECT name FROM department");
    //      const deptList = [];
    //      rows.forEach((dept) =>  deptList.push(dept.name));
    //      // console.log(deptList);
    //      return deptList;
    //    } catch (err) {
    //      console.log(err);
    //    }
    //  }

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

    async printEEs() {

    }

    async insertNewDept(newDept) {

    }

    async insertNewRole(newRole) {

    }

    async insertNewEE(newEE) {

    }
    
    async updateRole(updatedEE) {

    }
}

module.exports = { Emp_Database }


