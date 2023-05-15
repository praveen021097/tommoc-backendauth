const express = require("express");
const User = require("../models/user.model")
const {logout} =require("../middlewares/authentication")
const router =express.Router();

router.post("",logout,async(req,res)=>{
    try{
        // req.headers.authorization="";
        let user = await User.findOne({email:req.body.email});

        return res.status(200).send(user)
    }
    catch(err){
            return res.status(400).send({message:err.message})
    } 
})
module.exports=router;