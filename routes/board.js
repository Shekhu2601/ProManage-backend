const express=require('express')
const mongoose= require('mongoose')
const router = express.Router()
const dotenv =require("dotenv")
dotenv.config()

const bodyParser= require('body-parser')

const Board =require("../schema/board.schema")

router.post(("/added"), async(req ,res)=>{
    const { email, } =req.body;
    const ifuserExist = await Board.findOne({email}) //user is exists
    if(ifuserExist){
        return res.status(400).json({message: "Board member already exists"})
    }
    
    
    const board = new Board( { email })
    await board.save()
    res.status(200).json({message:" Added to board "})
})
// Get all board
router.get(("/") , async(req, res)=>{
    const users = await Board.find().select("-password")
    res.status(200).json(users)
})
//find by email
router.get("/:email",async(req, res)=>{
    const {email}=req.params;
    const user =await Board.findOne({email})
    if (!user){
        return res.status(404).json({message:"Board memeber Not Found"})
    }
    res.status(200).json(user)
})


     



module.exports=router;