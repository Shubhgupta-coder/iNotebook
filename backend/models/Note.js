const mongoose = require('mongoose');   
const {Schema}=mongoose;
const NotesSchema = new Schema({

   // Agar koi user koi notes daalta h to usse doosra koi user nhi dekh paaye , to hme notes ko user se link krnaa pdega
   user:{
    //Yaha pr jo user h wo kisi doosre object ki model id rakhra h (User Model ki) [Just like foreign key]
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'     // refrerence model user aaeaga
      
   },
   title:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:true,
   },
   tag:{
    type:String,
    default:"General"
   },
   date:{
    type:Date,
    default:Date.now
   },
  });

module.exports=mongoose.model('notes',NotesSchema);