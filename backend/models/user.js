const mongoose = require('mongoose');   

// import schema
const {Schema}=mongoose;

const userSchema = new Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true,  
    unique: true
   },
   password:{
    type:String,
    required:true
   },
   date:{
    type:Date,
    default:Date.now
   },
  });


// export model 
const User=mongoose.model('User',userSchema);
// User.createIndexes()  //for creating unique email id
module.exports=User;