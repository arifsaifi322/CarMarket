const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    }

    // username + password will be created by express itself
})

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("user",userSchema);
