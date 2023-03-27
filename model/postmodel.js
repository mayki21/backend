const mongoose = require("mongoose")

const postschema = mongoose.Schema({
    title:String,
    body:String,
    device:String,
    no_of_comments:Number
},{
    versionKey:false
})

const PostModel=mongoose.model("post",postschema)
module.exports=PostModel