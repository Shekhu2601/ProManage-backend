const mongoose =require("mongoose")
const Schema = mongoose.Schema;
const boardSchema = new Schema({
   
    email:{
        type:String,
        required:true,
        unique:true,

    },
   
  
    creationDate:{
        type: Date,
        default:Date.now

    },
})
const Board =mongoose.model("Board", boardSchema)
module.exports=Board;