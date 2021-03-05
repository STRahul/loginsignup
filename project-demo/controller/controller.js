const service = require('./service.js');
const path = require('path');
const randomstring  = require('randomstring');
const cookieparser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { genSaltSync, hashSync ,compareSync} = require('bcryptjs');
const { sign } = require('jsonwebtoken');

module.exports = {
   signup: (req,res) =>
   {
       let body = req.body;
       const salt = genSaltSync(10);
       body.password = hashSync(body.password,salt);
       service.create(body,(err,results)=>
       {
           if(err)
           {
               console.log(err);
               return res.status(500).json({
                   success: 0,
                   message : "user is already exist"
               });
           }
           
           const nodemailer = require('nodemailer');

           let transporter = nodemailer.createTransport({
           service: 'gmail',
           auth: {
               user: 'email',
               pass: 'password'
           }
           });
   
           let mailOptions = {
               from: 'email',
               to: body.email,
               subject: 'Sending Email using Node.js',
               text: 'you have registered successfully'
               }
   
               transporter.sendMail(mailOptions, function(error, info){
               if (error) 
                   console.log(error);
               else 
                   console.log('Email sent: ' + info.response);
               });

           return res.status(200).json({
               success:1,
               message:"data entered successfully"
       
           });
       });
   },

   login: (req,res) => {
       
           let name = req.body.name;
           service.loginByName(name,(err,results) => {
               if(err)
               console.log(err);
               if(!results){
                   return res.json({
                       success:0,
                       message:"Invalid username or password!"
                   }); 
                  
              }
               const result = compareSync(req.body.password,results.password);
               if(result){
                   results.password = undefined;
                   let jsontoken = sign({result:results},"abcxyz246",{
                       expiresIn:"2h"
                   })
                   res.cookie("Token",jsontoken);
                
                   return res.json({
                        success:1,
                        message:"login successfully"
                    })    
               }
               else{
                   return res.json({
                       success:0,
                       message:"Invalid username or password!"
                   });
                       
               }
           })
  },

  getForgotPassword : (req, res) => {
    res.render('forgot');
  },

  forgot: (req,res) =>{
      var name = req.body.name;
    
      service.checkName(name,(err,results)=>{
          if(err)
          {
              console.log(err);
          }
          if(!results){
           
            console.log("user does not exist!!");
            res.redirect('/forgot');
          }
          else if(results){
            let resetCode = randomstring.generate({
                length: 30,
                charset: 'alphanumeric'
              });
            
              let resetLink = `${resetCode}.${name}.${Date.now()}`
              service.addLink(name,resetLink,(err,result)=>{
                  if(err)
                   throw err;
              })
              const link = `http://localhost:5000/resetPassword/${resetLink}`
            
               const nodemailer = require('nodemailer');

               let transporter = nodemailer.createTransport({
               service: 'gmail',
               auth: {
                   user: 'eamil',
                   pass: 'password'
               }
               });
               
               let mailOptions = {
                   from: 'email',
                   to: results.email,
                   subject: 'This is your reset password link valid for 5 min',
                   text: `Here your Link ${link}`
               }
                   transporter.sendMail(mailOptions, function(error, info){
                   if (error) 
                       console.log(error);
                   else 
                       console.log('Email sent: ' + info.response);
                   });
                 res.json('Password reset link has been  sent your email....')
          }
      })
  },

  getResetPassword : (req, res) => {
    let resetLink = req.params.resetLink;
 
    let [, name, date] = resetLink.split('.');
    service.checkName(name,(err,results)=>{
        if(err) throw err;
    });

    if((Date.now() - date * 1) > 300000){
    
        return res.send("Link Expired or Invalid!!");
    }
    else{
        service.checkLink(resetLink,(err,results)=>{
            if(err||!results){
                return res.send("Link valid for one time!!");
            }
        })
    }

    res.render('reset', { resetLink })
  },

  reset: (req,res) =>{
    let {resetLink, password } = req.body;

    let [, name] = resetLink.split('.');
    
    service.checkName(name,(err,results)=>{
        if(err) throw err;
    });

    const salt = genSaltSync(10);
    password = hashSync(password,salt);
    console.log(password);
    service.resetPassword(name,password,(err,results)=>{
        if(err)
         throw err;
        else{
            res.redirect('/login');
            console.log('password reset successfully!!');
            resetLink = "";
            service.addLink(name,resetLink,(err,result)=>{
                if(err)
                 throw err;
            })
        }
    })
  }
}