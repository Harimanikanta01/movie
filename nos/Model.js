const mongoose=require("mongoose")
const New1=new mongoose.Schema({
    image:{
        type:String
    },
    text:{
        type:String,
        require:true
    },
   
})
module.exports=mongoose.model("new1",New1)