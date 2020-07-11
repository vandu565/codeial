/*const mongoose=require('mongoose');
 const userSchema=new mongoose.Schema({
     email:{
         type:String,
         require:true,
         unique:true
     },
     pasword:{
         type:String,
         required:true
     },
     name:{
         types:String,
         required:true
     }
 },{
     timestamps:true
 });

 const User=mongoose.model('User',userSchema);
 module.exports=User;*/


 const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);

module.exports = User;