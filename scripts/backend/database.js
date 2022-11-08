const mysql = require('mysql');
require('dotenv').config();

let con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.user,
    password: process.env.password
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


