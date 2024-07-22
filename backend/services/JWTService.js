const jwt= require('jsonwebtoken');
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET}=require('../config/index')


class JWTService{
  
   
  
    // sign access token
    signAccessToken(payload, expiryTime){
        return jwt.sign(payload, ACCESS_TOKEN_SECRET,{expiresIn:expiryTime});
    }

    //sign refresh token
     signRefreshToken(payload, expiryTime ){
        return jwt.sign(payload,REFRESH_TOKEN_SECRET,{expiresIn:expiryTime});
     }

      
    //verify access token
    //verify refresh token
    //store refresh token

}