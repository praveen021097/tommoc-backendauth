require("dotenv").config();
const passport = require("passport")
const { Strategy: LocalStrategy } = require('passport-local');
const jwt = require("jsonwebtoken");

const verifyToken=(token)=>{
 return new Promise((resolve,reject)=>{
    var decoded = jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
            if(err) return reject(err);
            return resolve(decoded);
    });
 });
}

// const authenticate =async(req,res,next)=>{
//     if(!req.headers.authorization)
//     return res.status(400).send({message:"Authentication token not found or incorrect"})

//     if(!req.headers.authorization.startsWith("Bearer "))
//     return res.status(400).send({message:"Authorization token not found or incorrect"})

//     const token = req.headers.authorization.trim().split(" ")[1]

//     let decoded;
//     try{
//         decoded=await verifyToken(token)
//     }catch(err){
//             console.log(err);
//             return res.status.send({message:"Authorization token not found or incorrect"})
//     }
// req.user=decoded.user;
//     return next()
// }

 function authenticate(req, res, next) {
    passport.authenticate('local', { session: false }, async(err, user, info) => {
      if (err) {
        return next(err);
      }
  
      // User not found or invalid password
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
  
      // Sign JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      let decoded;
          try{
              decoded=await verifyToken(token)
          }catch(err){
                  console.log(err);
                  return res.status.send({message:"Authorization token not found or incorrect"})
          }
      req.user=decoded.user;
      // Attach token to the response header
      res.setHeader('Authorization', `Bearer ${token}`);
  
      // Continue to the next middleware
      next();
    })(req, res, next);
  }
  function logout(req, res, next) {
    // Clear the Authorization header
    res.setHeader('Authorization', '');
  
    // Continue to the next middleware
    next();
  }
  // Create logout middleware
  
module.exports={authenticate,logout};