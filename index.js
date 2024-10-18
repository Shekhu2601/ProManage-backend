const express= require("express");
const app =express();
const dotenv=require("dotenv")
const cors =require("cors")
const mongoose= require('mongoose')
dotenv.config()
const userRouter= require("./routes/user")

const bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req,res)=>{
    res.send("shekhu")
})


app.use("/api/user", userRouter)
app.listen(process.env.PORT,()=>{
    console.log("server on running port 5000")
    mongoose.connect(process.env.MONGOOSE_URI_STRING,{

    })
    mongoose.connection.on("error", (err)=>{
        console.log(err)
    })
    

})