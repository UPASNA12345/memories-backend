import mongoose from "mongoose";

//1 create a user schema 

const userSchema = mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String, required: true},
    password: {type:String, required: true},
    id: {type: String}

})

export default mongoose.model("User", userSchema);