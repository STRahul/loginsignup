    const mysql = require('mysql');

    const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"databsaname"
    });

    con.connect((err) => {
        if(err)
        throw err;
        else
        console.log("Database connected!");
    });

    module.exports = con;