const mongoose=require("mongoose")
const Noc=new mongoose.Schema({
    name:{
        type:String,
      
    },
    image:{
        type:String,
        
    },
    banner:{
        type:String,
      
    },
    image1:{
        type:String
    },
    info:{
type:String
    }
})
module.exports=mongoose.model('movie1',Noc)