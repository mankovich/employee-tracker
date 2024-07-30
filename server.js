const express = require('express');
//import and require Pool (node-postgres), will be creating a Connection Pool 
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//Connect to database

const pool = new Pool(
    {
        user: 'postgres',
        password: 'password',
        host: 'localhost',
        database: employees_db
    }
    console.log('----------------------------------------\nConnected to the employees_db database.\n----------------------------------------')
)

pool.connect();

