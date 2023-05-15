const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const generateToken=(user)=>{
    return jwt.sign({user},process.env.JWT_SECRET_KEY, { expiresIn: '1h' } );

}

const register =async (req, res) => {
  try {
   let user = await User.findOne({email:req.body.email});
   if(user){
    //checking email
    return res.status(400).send({message:"Email already exists"})
   }
   user =await User.create(req.body);
   const token = generateToken(user)
   return res.status(200).send({user,token})
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};






const login =async (req, res) => {
  try {
let user = await User.findOne({email:req.body.email});

if(!user){
    return res.status(400).send("wrong email or password")
}
  
const match =user.checkPassword(req.body.password)
 // if its doesn't match 
if(!match){
    return res.status(400).send({message:"password doesn't match"})
}
// if its  matched 
const token = generateToken(user)
   return res.status(200).send({user,token})

  } catch (err) {

    res.status(400).send({ message: err.message });
  }
};

module.exports = { register, login};
