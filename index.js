const { start } = require('./js/prompt');
const { Pool } = require('./js/query.js');

function printWelcome() {
    console.log(`\n\n\n========================================
        Hello and welcome to the user command-line interface for this employee-tracker application.\n========================================`
    )
};

function printGoodbye() {
    console.log(`\n\n\n========================================\n\n
        Goodbye.\n\n========================================`
    )
};

async function init() {
    const pool = new Pool();
    printWelcome();
    await start();
    printGoodbye();
    pool.end()
};

init();