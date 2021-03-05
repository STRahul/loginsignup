    const jwt = require('jsonwebtoken');

    module.exports = {
        checkToken : (req,res,next) => {
            let token = req.headers.cookie;
            
            if(token)
            {
            token = token.slice(6);
            
            jwt.verify(token,"abcxyz246",(err) => {
                if(err){
                res.json({
                    success:0,
                    message:'invalid token'
                }) ;
                
                }
                else{
                    next();
                }
            });
            }
            else{
                res.json({
                    success:0,
                    message:'Access denied! unauthorized user'
                })
            }
        }
    }