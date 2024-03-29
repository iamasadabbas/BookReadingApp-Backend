const cookieParser = require('cookie-parser')
const express = require('express');
const router = express.Router();
router.use(cookieParser())
 
 
 function verify (req,resp,next){
    const {token}=req.cookies
    // console.log(req.cookies)
    if(!token){
        resp.send( {status:401,message:"Not authorized"})
        // console.log("token not found");
    }else{
        next();
    }
}
module.exports=verify