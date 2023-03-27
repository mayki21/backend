const express=require("express")
const userRouter=express.Router()
const userModel=require("../model/usermodel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")


userRouter.post("/register", (req,res)=>{
    try {
        const {name,email,gender,password,age,city,is_married}=req.body
        bcrypt.hash(password, 4, async (err, hash)=> {
            
            const user=new userModel({name,email,gender,password:hash,age,city,is_married})
            await user.save()
            res.status(200).send({"msg":"registration done"})
        });




    } 
    
    
    catch (error) {
        res.status(404).send({"msg":"error occured"})
    }
})


userRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body
    const data=await userModel.findOne({email})
    if(data)
    {
        bcrypt.compare(password,data.password,function(err,result){
            if(result)
            {
                res.status(200).send({"msg":"login successful","token":jwt.sign({"userID":data._id},"abc",{expiresIn:"6h"})})

            }
            else
            {
                res.status(400).send({"msg":"user not in the database"})
            }
        })
    }
})

module.exports=userRouter