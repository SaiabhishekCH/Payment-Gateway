import mongoose, { mongo } from "mongoose";

import { Schema } from "mongoose";
mongoose.connect("mongodb+srv://bookstore:sepptember12@cluster0.9wydz.mongodb.net/");


const userSchema = new Schema({
    firstName : String,
    lastName : String,
    password : String,
    username : String
})

const accountSchema = new Schema({
    balance : Number,
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
})

const userModel = mongoose.model('user' , userSchema);
const accountModel = mongoose.model('account' , accountSchema);
export {userModel , accountModel};
