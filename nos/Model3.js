const mongoose=require("mongoose")
const Nr=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("create account",Nr)