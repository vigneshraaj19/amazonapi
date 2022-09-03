const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    title:{type:String,required:true}, 
    price:{type:Number,required:true},
    rating:{type:Number,required:true},
    image:{type:String,required:true},
});
//sending data to the userRouter file
const User=mongoose.model('user',UserSchema)
module.exports = User 
