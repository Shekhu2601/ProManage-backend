const mongoose =require("mongoose")
const Schema = mongoose.Schema;
const {User} =require("./user.schema")
const taskSchema = new Schema({
    title :{
        type:String,
        required:true,
    },
    priority:{
        type:String,
        required:true,
        

    },
    assign:{
        type:String,
       
        

    },
   
    checklists:{
        type:String,
        required:true,
       

    },
    creator:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required:true

    },
    creationDate:{
        type: Date,
        default:Date.now

    },
})
const Task =mongoose.model("Task", taskSchema)
module.exports=Task;