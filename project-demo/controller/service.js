    const con = require('../config/db.js');

    module.exports = {
        create: (data, callback) => {
            
            con.query(
                'insert into student(name,age,email,password) values(?,?,?,?)',
                [
                    data.name,
                    data.age,
                    data.email,
                    data.password
                ],
                (err, results) => {
                    if (err)  return callback(err); 
                    return callback(null, results);
                }
            );
        },

        loginByName:(name,callback) => {
            con.query('select * from student where name = ?',[name],
            (err,results) => {
                if (err)  return callback(err);

                return callback(null, results[0]);
            })
        },

        checkName: (name,callback) =>{
            con.query('select * from student where name = ?',[name],
            (err,results)=>{
                if (err)  return callback(err);

                return callback(null, results[0]);
            })
        },
        checkLink: (resetLink,callback)=>{
            con.query('select * from student where token = ?',[resetLink],
            (err,results)=>{
                if (err)  return callback(err);

                return callback(null, results[0]);
            })
        },

        addLink: (name,link,callback)=>{
            con.query('update student set token=? where name=?',[link,name],
            (err,results)=>{
                if (err)  return callback(err);

                return callback(null, results[0]);
            })
        },

        resetPassword: (name,password,callback)=>{
            con.query('update student set password=? where name=?',[password,name],
            (err,results)=>{
                if (err)  return callback(err);

                return callback(null, results[0]);
            })
        }

    }
    