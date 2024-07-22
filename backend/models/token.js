const mongoose =require('mongoose');
const {Schema}= mongoose;

const RefreshTokenSchema= new Schema({
    token:{type:String , required:true},
    userId:{typr:mongoose.Schema.Types.ObjectId , ref:'users'}

})


module.exports=mongoose.model('RefreshToken','RefreshTokenSchema','tokens');
