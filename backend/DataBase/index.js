const mongoose=require('mongoose');

const { MONGODB_CONNECTION_STRING } = require('../config');

const connectionString=MONGODB_CONNECTION_STRING

const dbConnected = async()=>{
    try {
        const conn=await mongoose.connect(connectionString);
        console.log(`Database connected to host ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error:${error}`);
    }
}

module.exports=dbConnected;