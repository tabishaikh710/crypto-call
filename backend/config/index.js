const dotenv=require('dotenv').config();
const PORT=process.env.port;
const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET=process.env.REFRESH_TOKEN_SECRET;

const MONGODB_CONNECTION_STRING=process.env.MONGODB_CONNECTION_STRING;

module.exports={
    PORT,
    MONGODB_CONNECTION_STRING,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET
}
