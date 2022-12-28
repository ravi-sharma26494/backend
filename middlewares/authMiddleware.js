const asyncHandler = require('express-async-handler')
const User = require('../models/User');
const jwt  = require('jsonwebtoken');
const { Error } = require('mongoose');

const protect = asyncHandler(async(req, res, next)=>{
    try {
        const token  = req.cookies.token;
        if(!token){
            res.status(401)
            throw new Error("Not Authorized, please login first.")

        }
        const verified  = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.id).select("-password")
        
        if(!user){
            res.status(401)
            throw new Error("User Not Found")
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401)
            throw new Error("You need to be logged in ")
    }
});

module.exports = {
    protect
}