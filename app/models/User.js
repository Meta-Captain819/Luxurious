import mongoose from "mongoose";

const Userschema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password: { type: String },
    createdAt: { type: Date, default: Date.now },
    profilepic:{type:String}
})

export default mongoose.models.User || mongoose.model('User',Userschema)