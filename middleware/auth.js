const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    let token=req.headers.authorization
    if(token)
    {
        jwt.verify(token, "abc", function(err, decoded) {
            if(decoded)
            {
                req.body.userID=decoded.userID
                next()
            }
            else
            {
                res.send({"msg":"login first"})
            }
          });
    }
}
module.exports=auth