const mongoose = require("mongoose");

module.exports =()=>{
    return mongoose.connect("mongodb+srv://pravkumar059:pk059@cluster0.erarwdg.mongodb.net/?retryWrites=true&w=majority");
};