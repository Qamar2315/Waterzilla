const {verify}= require("jsonwebtoken");

const validateToken=(req,res,next)=>{
    const accessToken= req.header("accessToken");
    if(!accessToken){
        return res.json({error:"ADMIN NOT LOGGED IN !!!"})
    }
    try {
        const validToken= verify(accessToken,"secret1234");
        req.user= validToken;
        if(validToken){
            return next();
        }
    } catch (error) {
        return res.json({error:error})
    }
}

module.exports = {validateToken};