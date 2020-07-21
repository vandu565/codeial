const User = require('../../../models/users');
const jwt =require('jsonwebtoken');



module.exports.createSession= async function(req,res){
    try{console.log("in create session");
        let user = await User.findOne({email:req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422,{
                message:'invalid username/pasword',
                
            });
        }

        return res.json(200,{
            
            message:'sucesfully signed in , keep ur token safe',
            data:{
                token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'100000000'})
            }
            
        });
    }catch{console.log(err);
        return res.json(422,{
            message:'error',
            
            
        });

    }
}

