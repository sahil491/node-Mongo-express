const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required : true
        },
        email:{
            type:String,
            required : true,
            unique:true,
        },
        password:{
            type:String,
            required : true,
        },
        isAdmin:{
            type:Boolean,
            required : true,
            default:false,
        },
        pic:{
            type:String,
            required : true,
            default:`https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png`
        }
    },
    {
        timestamps:true,
    }
);

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})
userSchema.methods.matchPassword = async function (enterPasword){
    return await bcrypt.compare(enterPasword, this.password)
}

const User = mongoose.model('user', userSchema);
module.exports =User;