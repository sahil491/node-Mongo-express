const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const registerUser = asyncHandler(async (req,res)=>{
    const {name,email,password,pic} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User already Exists")
    }
    const user = await User.create({
        name,
        email,
        password,
        pic,
    })
if(user){
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        pic:user.pic,
        token:generateToken(user._id)
    })
}else{
    res.status(400)
    throw new Error("Error Occured!")
}

    
});

const authUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Invalid Email/password")
    }
    
    
});

const updateUserProfile = asyncHandler(
    async (req,res) =>{
        const user = await User.findById(req.user._id);
        if(user){
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.pic = req.body.pic || user.pic;
        
        if(req.body.password){
            user.password = req.body.password;
        }
        const updateedUser = await user.save();

        res.json({
            _id:updateedUser._id,
            name:updateedUser.name,
            email:updateedUser.email,
            pic:updateedUser.pic,
            token:generateToken(updateedUser._id),

        });
    }else{
        res.status(404)
        throw new Error("user not found")
    }
    }
);
 
module.exports = {registerUser,authUser,updateUserProfile};