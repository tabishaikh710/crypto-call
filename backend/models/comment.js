const mongoose = require('mongoose');
const {Schema}= mongoose;

const commentSchema=new Schema({
    content:{type:String , required:true},
    blog:{type:mongoose.SchemaTypes.objectId , ref:'blogs'},
    auther:{type:mongoose.SchemaTypes.objectId , ref:'users'},
    
  
},{timestamps:true}
);
module.exports=mongoose.model('Comment', commentSchema, 'comments' );