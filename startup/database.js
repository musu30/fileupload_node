var mysql = require('mysql');
var conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQLDB,
});
conn.connect(function (err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});
module.exports = conn;