const express=require('express')
const mongoose= require('mongoose')
const router = express.Router()

const authMiddleware =require("../midddilewre/auth")
const bodyParser= require('body-parser')

const User =require("../schema/user.schema")
const Task = require("../schema/task.schema")
const isAuth =require("../utils/index")


 


router.post("/create",authMiddleware, async(req, res)=>{
    try{
        const {title, priority,assign,checklists,creator} =req.body;
        const user =req.user;
        
        const task = new Task( {title, priority,assign,checklists,creator:user})
        await task.save()
        res.status(201).json({message:"Task create successfully"})
    }
    catch(error)
    
    { console.log(error)
        res.status(400).json({message:"Task not create"})

    }
})
router.get(("/") , async(req, res)=>{
    const isAuthenticated=isAuth(req)
    const task =isAuthenticated ?await Task.find(): await Task.find().select("-_id")
    res.status(200).json(task)
})
// authenticed 


// delete jobs
router.delete("/:id", authMiddleware, async (req,res)=>{
    const id =req.params.id;
    const task =await Task.findById(id);
    if(!task){
        return res.status(400).json({message:"task not found"})
    }
    if(task.creator.toString() !==req.user.toString()){
        return res.status(401).json({message:"You are not authorized to delete this task" })
    }
    await Task.findByIdAndDelete(id);
    res.status(200).json({message:"task delete successfully"});
})

router.put("/:id", authMiddleware, async(req, res)=>{
   try{
    const id = req.params.id;
    const {title, priority,assign,checklists,creator} =req.body;
   
    let task =await Task.findById(id);
    if(!task){
        return res.status(400).json({message:"Task not found"})
    }
    if(task.creator.toString() !==req.user.toString()){
        return res.status(401).json({message:"You are not authorized to edit this job" })
    }
     task = await Task.findByIdAndUpdate(id,{title, priority,assign,checklists} ,{new:true});
    
    res.status(201).json(task)
}
   
   catch(error){
    console.log(error)
    res.status(400).json({message:"task not updated"})
   }
})
// TODO: add skills also

  
 /*router.get("/:id", validateRequest({
     params: z.object({
         id: z.string().uuid()
     }),
 }), authMiddleware, async (req, res) => {
     const { id } = req.params.id;
     const job = await Job.findById(id);
     if (!job) {
         return res.status(404).json({ message: "Job not found" });
     }
     res.status(200).json(job);

    
     
 }
 );*/
module.exports =router;