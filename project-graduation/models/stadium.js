const mongoose=require('mongoose')

const erenaSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
        avatar:{
        type:String,
        default:'uploads/bg.jpg'
    },
   link:{
    type:String,
    required:true
    }
})
module.exports=mongoose.model('Erena',erenaSchema)  