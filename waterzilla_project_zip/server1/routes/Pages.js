const express= require('express');
const router= express.Router();
const {Website} = require("../models")

router.get("",async (req,res)=>{
    const webpage=await Website.findOne({});
    res.json({website:webpage.dataValues});
})

router.put("",async (req,res)=>{
    const webpage= await Website.update(req.body,{where:{id:1}});
    res.json({success:"updated about us"})
})


module.exports=router;