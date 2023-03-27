const express=require("express")
const postroute=express.Router()
const postModel=require("../model/postmodel")
const jwt=require("jsonwebtoken")


postroute.get("/",async (req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"abc")
    try {
        if(decoded)
        {
            const data=await PostModel.find({"userID":decoded.userID})
            res.status(200).send(data)
        }
    } 
    
    catch (error) {
        res.status(400).send({"msg":"error"})
    }
})


postroute.post("/add",async (req,res)=>{
    try {
        const data=new PostModel(req.model)
        await data.save()
        res.status(200).send({"msg":"post added"})
    } catch (error) {
        res.status(200).send({"msg":"err.n=message"})
    }
})


postroute.delete("/delete/:id",async (req,res)=>{
    let {id}=req.params
    const data=await PostModel.findByIdAndDelete({_id:id})
    res.status(200).send(data)
})


postroute.patch("/patch/:id",async (req,res)=>{
    let {id}=req.params
    let pay=req.body
    const data=await PostModel.findByIdAndUpdate({userID:id},pay)
    await data.save()
    res.status(200).send(data)
})

module.exports=postroute