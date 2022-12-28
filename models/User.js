const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true, "Please add an email"],
        unique:true,
        trim:true,
        match:[ /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        , "Please enter a valid email address"]

    },
    password:{
        type:String,
        required:[true,"Please add a secure Password"],
        minLength:[8, "Password must contain atleast 8 Characters"]
    },
    // confirmpassword:{
    //     type:String,
    //     required:[true,"Please add a secure Password"],
    //     minLength:[8, "Password must contain atleast 8 Characters"]
    // },
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next()
    }
    //hash
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword;
    next();
})

 const User = mongoose.model('User', userSchema);
 module.exports = User;