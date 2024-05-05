const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my-app'
});

con.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

module.exports = con;
