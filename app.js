const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const { coursesmodel } = require("./models/course")


const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://suhan:suhan2109@cluster0.iuizdnx.mongodb.net/courseDB?retryWrites=true&w=majority&appName=Cluster0")
app.post("/add",(req,respo)=>{
    let input=req.body
    let course=new coursesmodel(input)
    course.save(
        respo.json({status:"success"})
    )
    
})
app.get("/view",(req,respo)=>{
    coursesmodel.find().then(
        (data)=>{
            respo.json(data)
        }
    ).catch()
})

app.post("/search",(req,respo)=>{
    let input=req.body
    coursesmodel.find(input).then(
        (data)=>{
            respo.json(data)
        }
    ).catch()
})
app.post("/delete",(req,respo)=>{
    let input=req.body
    coursesmodel.findByIdAndDelete(input._id).then(
        (response)=>{
            respo.json({"status":"success"})
        }
    ).catch(
        (error)=>{
            respo.json({"status":"error"})
        }
    )
})

app.listen(8080,()=>{
    console.log("serverstarted")
})