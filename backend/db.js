const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://shubhgupta172004:notebook@cluster0.0lcyath.mongodb.net/inotebook" 

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

//export it to use it in other files
module.exports=connectToMongo;