require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB

const connectDB = async () => {
    try{
        mongoose.set("strict", false);
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongo connecté");
        
        
    }
    catch(err){
    
        console.error(err);
        process.exit(1);
    }
    
    };
    
 module.exports = connectDB ;