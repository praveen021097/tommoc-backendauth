const express = require("express");
const router = express.Router();
const Product = require("../models/product.model")
const {authenticate} = require("../middlewares/authentication")
router.post("",authenticate,async(req,res)=>{


    req.body.user_id=req.user._id
    try{
        let product = await Product.create(req.body);
        return res.status(200).send(product)
    }
    catch(err){
            return res.status(400).send({message:err.message})
    }
})

router.get("",async(req,res)=>{ 
    try{
        let product = await Product.find().lean().exec();
        return res.status(200).send(product)
    }
    catch(err){
            return res.status(400).send({message:err.message})
    }
})
module.exports=router;
