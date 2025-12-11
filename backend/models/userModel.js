import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, default: ''},
    address: {type: String, default: ''},
    cartData: {type: Object, default: {}},
}, {minimize:false, timestamps: true});

const userModel = mongoose.model("user", userSchema); // Register again with updated schema

export default userModel;


// delete mongoose.models.user; 